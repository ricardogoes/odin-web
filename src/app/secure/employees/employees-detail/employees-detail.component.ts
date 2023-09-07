import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { Employee } from '../models/employees.model';
import { EmployeesService } from '../employees.service';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/_shared/components/form-base/form-base.component';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { EmployeeToInsertRequest } from '../models/employees-insert.model';
import { EmployeeToUpdateRequest } from '../models/employees-update.model';
import { CEPService } from 'src/app/_shared/services/cep.service';
import { CpfCnpjValidator } from 'src/app/_shared/validators/cpf-cnpj.validator';
import { AddressRequest } from '../models/address-request.model';
import { DepartmentsService } from '../../departments/departments.service';
import { Department } from '../../departments/models/departments.model';

@Component({
  selector: 'odin-employees-detail',
  templateUrl: 'employees-detail.component.html'
})
export class EmployeesDetailComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  breadCrumbsLinks: BreadcrumbLink[];

  employeeId = "";

  departments$ = new Observable<any>();
  departments: Department[] = [];

  employee$ = new Observable<any>();
  employee: Employee|undefined;

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  employeeForm: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private cepService: CEPService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    super();

    this.titleService.setTitle('Odin | Funcionários');

    this.breadCrumbsLinks = [
      {
        name: 'Funcionários',
        route: '/secure/employees',
      }
    ];

    this.employeeForm = this.fb.group({
      department_id: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      document: ['', [Validators.required, CpfCnpjValidator.validate]],
      email: ['', [Validators.required, Validators.email]],
      street_name: [''],
      street_number: [''],
      complement: [''],
      neighborhood: [''],
      zip_code: [''],
      city: [''],
      state: ['']
    });

    const validationMessages = {
      first_name: {
        required: 'Primeiro nome obrigatório',
      },
      last_name: {
        required: 'Último nome obrigatório',
      },
      document: {
        required: 'Documento obrigatório',
        invalidCpfCnpj: 'Documento inválido'
      },
      email: {
        required: 'Email obrigatório',
        email: 'Email inválido'
      }
    };

    super.configurarMensagensValidacao(validationMessages);
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? "";

    this.loadDepartments();

    if(this.employeeId === 'new')
      this.setNewEmployee();
    else
      this.loadEmployee();
  }

  ngAfterViewInit(): void {
    super.configurarValidacoesFormulario(
      this.formInputElements,
      this.employeeForm
    );
  }

  setNewEmployee(): void {
    this.employee = {
      id: "",
      customer: { id: this.authService.getCustomerId(), name: '' },
      first_name: "",
      last_name: "",
      fullname: "",
      document: "",
      email: "",
      is_active: true,
      created_by: "",
      created_at: new Date(),
      last_updated_by: "",
      last_updated_at: new Date()
    };

    this.breadCrumbsLinks.push(
      {
        name: `Novo funcionário`,
        route: `/secure/employees/new`
      });
  }

  loadDepartments(): void {
    this.departments$ = this.departmentsService.findAll('?page_number=1&page_size=50&is_active=true') //TODO: Ajustar paginação
      .pipe(
        map((response) => {
          this.departments = [...response.items];
          return response;
        })
      );
  }

  loadEmployee(): void {
    this.employee$ = this.employeesService.findById(this.employeeId)
      .pipe(
        map((employee: Employee) => {
          this.employee = employee;
          this.breadCrumbsLinks.push(
          {
            name: `Funcionário : ${employee.first_name} ${employee.last_name}`,
            route: `/secure/employees/${employee.id}`
          });

          this.employeeForm.patchValue(employee);
          this.employeeForm.controls['department_id'].patchValue(employee.department?.id);
          this.employeeForm.controls['street_name'].patchValue(employee.address?.street_name);
          this.employeeForm.controls['street_number'].patchValue(employee.address?.street_number);
          this.employeeForm.controls['complement'].patchValue(employee.address?.complement);
          this.employeeForm.controls['neighborhood'].patchValue(employee.address?.neighborhood);
          this.employeeForm.controls['zip_code'].patchValue(employee.address?.zip_code);
          this.employeeForm.controls['city'].patchValue(employee.address?.city);
          this.employeeForm.controls['state'].patchValue(employee.address?.state);

          this.spinner.hide();
          return employee;
        })
      );
  }

  handleSubmit(): void {
    if(this.employeeId == 'new')
      this.insertEmployee();
    else
      this.updateEmployee();
  }

  handleBackButton(): void {
    this.router.navigate(['/secure/employees']);
  }

  handleFindCep(): void {
    const cep = this.employeeForm.controls['zip_code'].value;
    this.cepService.findCEP(cep).subscribe({
      next: (cepData) => {
        this.employeeForm.controls['street_name'].patchValue(cepData.logradouro);
        this.employeeForm.controls['neighborhood'].patchValue(cepData.bairro);
        this.employeeForm.controls['city'].patchValue(cepData.localidade);
        this.employeeForm.controls['state'].patchValue(cepData.uf);
      },
      error: (error) => {
        console.log(JSON.stringify(error));
        this.toastrService.error('Não foi possível buscar o CEP', 'Erro');
      }
    })
  }

  private insertEmployee(): void {
    const employeeToInsert: EmployeeToInsertRequest = {
      customer_id: this.authService.getCustomerId(),
      department_id: this.employeeForm.controls['department_id'].value !== '' ? this.employeeForm.controls['department_id'].value : null,
      first_name: this.employeeForm.controls['first_name'].value,
      last_name: this.employeeForm.controls['last_name'].value,
      document: this.employeeForm.controls['document'].value,
      email: this.employeeForm.controls['email'].value,
      logged_username: this.authService.getLoggedUsername()
    }

    this.employeesService.insert(employeeToInsert)
      .pipe(
        map((employeeInserted) => {
          if(this.employeeForm.controls['zip_code'].value && this.employeeForm.controls['zip_code'].value !== '')
            this.insertAddress(employeeInserted.id);
        })
      )
      .subscribe({
        next: () => {
          this.toastrService.success('Funcionário incluído com sucesso', 'Sucesso');
          this.router.navigate(['/secure/employees']);
        },
        error: (error) => {
          this.toastrService.error(error.error.detail,'Erro')
        }
      });
  }

  private updateEmployee(): void {
    const employeeToUpdate: EmployeeToUpdateRequest = {
      id: this.employeeId,
      customer_id: this.authService.getCustomerId(),
      department_id: this.employeeForm.controls['department_id'].value !== '' ? this.employeeForm.controls['department_id'].value : null,
      first_name: this.employeeForm.controls['first_name'].value,
      last_name: this.employeeForm.controls['last_name'].value,
      document: this.employeeForm.controls['document'].value,
      email: this.employeeForm.controls['email'].value,
      logged_username: this.authService.getLoggedUsername()
    }

    this.employeesService.update(this.employeeId, employeeToUpdate)
      .pipe(
        map((employeeUpdated) => {
          console.log(this.employeeForm.controls['zip_code'].value);
          if(this.employeeForm.controls['zip_code'].value && this.employeeForm.controls['zip_code'].value !== '')
            this.insertAddress(employeeUpdated.id);
        })
      )
      .subscribe({
        next: () => {
          this.toastrService.success('Funcionário atualizado com sucesso', 'Sucesso');
          this.router.navigate(['/secure/employees']);
        },
        error: (error) => {
          this.toastrService.error(error.error.detail,'Erro')
        }
      });
  }

  private insertAddress(employeeId: string): void {
    const address: AddressRequest = {
      employee_id: employeeId,
      street_name: this.employeeForm.controls['street_name'].value,
      street_number: this.employeeForm.controls['street_number'].value,
      complement: this.employeeForm.controls['complement'].value,
      neighborhood: this.employeeForm.controls['neighborhood'].value,
      zip_code: this.employeeForm.controls['zip_code'].value,
      city: this.employeeForm.controls['city'].value,
      state: this.employeeForm.controls['state'].value,
    }

    this.employeesService.changeAddress(employeeId, address)
      .subscribe({
        error: (error) => throwError(() => error)
      });
  }
}
