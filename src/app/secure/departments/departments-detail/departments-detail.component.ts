import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { Department } from '../models/departments.model';
import { DepartmentsService } from '../departments.service';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/_shared/components/form-base/form-base.component';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { DepartmentToInsertRequest } from '../models/departments-insert.model';
import { DepartmentToUpdateRequest } from '../models/departments-update.model';

@Component({
  selector: 'odin-departments-detail',
  templateUrl: 'departments-detail.component.html',
})
export class DepartmentsDetailComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  breadCrumbsLinks: BreadcrumbLink[];

  departmentId = "";

  department$ = new Observable<any>();
  department: Department|undefined;

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  departmentForm: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private departmentsService: DepartmentsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    super();

    this.titleService.setTitle('Odin | Departamentos');

    this.breadCrumbsLinks = [
      {
        name: 'Departamentos',
        route: '/secure/departments',
      }
    ];

    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    const validationMessages = {
      name: {
        required: 'Nome obrigatório',
      }
    };

    super.configurarMensagensValidacao(validationMessages);
  }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id') ?? "";

    if(this.departmentId === 'new')
      this.setNewDepartment();
    else
      this.loadDepartment();
  }

  ngAfterViewInit(): void {
    super.configurarValidacoesFormulario(
      this.formInputElements,
      this.departmentForm
    );
  }

  setNewDepartment(): void {
    this.department = {
      id: "",
      name: "",
      is_active: true,
      created_by: "",
      created_at: new Date(),
      last_updated_by: "",
      last_updated_at: new Date()
    };

    this.breadCrumbsLinks.push(
      {
        name: `Novo departamento`,
        route: `/secure/departments/new`
      });
  }

  loadDepartment(): void {
    this.department$ = this.departmentsService.findById(this.departmentId)
      .pipe(
        map((department: Department) => {
          this.department = department;
          this.breadCrumbsLinks.push(
          {
            name: `Departamento : ${department.name}`,
            route: `/secure/departments/${department.id}`
          });

          this.departmentForm.patchValue(department);

          this.spinner.hide();
          return department;
        })
      );
  }

  handleSubmit(): void {
    if(this.departmentId == 'new')
      this.insertDepartment();
    else
      this.updateDepartment();
  }

  private insertDepartment(): void {
    const departmentToInsert: DepartmentToInsertRequest = {
      customer_id: this.authService.getCustomerId(),
      name: this.departmentForm.controls['name'].value,
      logged_username: this.authService.getLoggedUsername()
    }

    this.departmentsService.insert(departmentToInsert)
      .subscribe({
        next: () => {
          this.toastrService.success('Departamento inserido com sucesso','Sucesso');
          this.router.navigate(['/secure/departments']);
        },
        error: (error) => {
          this.toastrService.error(error.detail,'Erro')
        }
      });
  }

  private updateDepartment(): void {
    const departmentToUpdate: DepartmentToUpdateRequest = {
      id: this.departmentId,
      customer_id: this.authService.getCustomerId(),
      name: this.departmentForm.controls['name'].value,
      logged_username: this.authService.getLoggedUsername()
    }

    this.departmentsService.update(this.departmentId, departmentToUpdate)
      .subscribe({
        next: () => {
          this.toastrService.success('Departamento atualizado com sucesso','Sucesso');
          this.router.navigate(['/secure/departments']);
        },
        error: (error) => {
          this.toastrService.error(error.detail,'Erro')
        }
      });
  }

  handleBackButton(): void {
    this.router.navigate(['/secure/departments']);
  }
}
