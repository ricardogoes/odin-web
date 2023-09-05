import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/_shared/components/form-base/form-base.component';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'odin-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent
  extends FormBaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {
    super();

    this.titleService.setTitle('Odin | Login');

    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    const validationMessages = {
      Username: {
        required: 'O Username é obrigatório',
      },
      Password: {
        required: 'O Password é obrigatório',
      },
    };

    super.configurarMensagensValidacao(validationMessages);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.configurarValidacoesFormulario(
      this.formInputElements,
      this.loginForm
    );
  }

  login(): void {
    this.authService.logout();

    const username = this.loginForm.controls['Username'].value;
    const password = this.loginForm.controls['Password'].value;

    this.authService.authenticate(username, password).subscribe({
      next: () => {
        this.router.navigate(['secure/home']);
      },
      error: (error) => {
        this.toastrService.error('Usuário/senha inválidos', 'Erro');
      },
    });
  }

  resetPassword(): void {
    this.toastrService.error('Not implemented', 'Error');
  }
}
