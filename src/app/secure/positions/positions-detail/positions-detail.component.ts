import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { Position } from '../models/positions.model';
import { PositionsService } from '../positions.service';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/_shared/components/form-base/form-base.component';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PositionToInsertRequest } from '../models/positions-insert.model';
import { PositionToUpdateRequest } from '../models/positions-update.model';

@Component({
  selector: 'odin-positions-detail',
  templateUrl: 'positions-detail.component.html',
})
export class PositionsDetailComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  breadCrumbsLinks: BreadcrumbLink[];

  positionId = "";

  position$ = new Observable<any>();
  position: Position|undefined;

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  positionForm: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private positionsService: PositionsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    super();

    this.titleService.setTitle('Odin | Cargos');

    this.breadCrumbsLinks = [
      {
        name: 'Cargos',
        route: '/secure/positions',
      }
    ];

    this.positionForm = this.fb.group({
      name: ['', [Validators.required]],
      base_salary: ['']
    });

    const validationMessages = {
      name: {
        required: 'Nome obrigatório',
      }
    };

    super.configurarMensagensValidacao(validationMessages);
  }

  ngOnInit(): void {
    this.positionId = this.route.snapshot.paramMap.get('id') ?? "";

    if(this.positionId === 'new')
      this.setNewPosition();
    else
      this.loadPosition();
  }

  ngAfterViewInit(): void {
    super.configurarValidacoesFormulario(
      this.formInputElements,
      this.positionForm
    );
  }

  setNewPosition(): void {
    this.position = {
      id: "",
      customer: { id: this.authService.getCustomerId(), name: '' },
      name: "",
      is_active: true,
      created_by: "",
      created_at: new Date(),
      last_updated_by: "",
      last_updated_at: new Date()
    };

    this.breadCrumbsLinks.push(
      {
        name: `Novo cargo`,
        route: `/secure/positions/new`
      });
  }

  loadPosition(): void {
    this.position$ = this.positionsService.findById(this.positionId)
      .pipe(
        map((position: Position) => {
          this.position = position;
          this.breadCrumbsLinks.push(
          {
            name: `Cargo : ${position.name}`,
            route: `/secure/positions/${position.id}`
          });

          this.positionForm.patchValue(position);

          this.spinner.hide();
          return position;
        })
      );
  }

  handleSubmit(): void {
    if(this.positionId == 'new')
      this.insertPosition();
    else
      this.updatePosition();
  }

  private insertPosition(): void {
    const positionToInsert: PositionToInsertRequest = {
      customer_id: this.authService.getCustomerId(),
      name: this.positionForm.controls['name'].value,
      base_salary: this.positionForm.controls['base_salary'].value ?? null,
      logged_username: this.authService.getLoggedUsername()
    }

    this.positionsService.insert(positionToInsert)
      .subscribe({
        next: () => {
          this.toastrService.success('Cargo inserido com sucesso','Sucesso');
          this.router.navigate(['/secure/positions']);
        },
        error: (error) => {
          this.toastrService.error(error.error.detail,'Erro')
        }
      });
  }

  private updatePosition(): void {
    const positionToUpdate: PositionToUpdateRequest = {
      id: this.positionId,
      customer_id: this.authService.getCustomerId(),
      name: this.positionForm.controls['name'].value,
      base_salary: this.positionForm.controls['base_salary'].value ?? null,
      logged_username: this.authService.getLoggedUsername()
    }

    this.positionsService.update(this.positionId, positionToUpdate)
      .subscribe({
        next: () => {
          this.toastrService.success('Cargo atualizado com sucesso','Sucesso');
          this.router.navigate(['/secure/positions']);
        },
        error: (error) => {
          this.toastrService.error(error.error.detail,'Erro')
        }
      });
  }

  handleBackButton(): void {
    this.router.navigate(['/secure/positions']);
  }
}
