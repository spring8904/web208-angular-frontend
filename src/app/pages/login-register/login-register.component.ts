import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };
}

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent {
  authServices = inject(AuthService);
  toastr = inject(ToastrService);
  route = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator(),
    }
  );

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authServices.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.toastr.success('Login successful');
        if (res.isAdmin) this.route.navigate(['/dashboard']);
        else this.route.navigate(['/']);
      },
      error: (err) => {
        if (Array.isArray(err.error.message)) {
          err.error.message.forEach((msg: string | undefined) => {
            this.toastr.error(msg);
          });
        } else {
          this.toastr.error(err.error.message);
        }
      },
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authServices.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Register successful');
        this.registerForm.reset();
      },
      error: (err) => {
        if (Array.isArray(err.error.message)) {
          err.error.message.forEach((msg: string | undefined) => {
            this.toastr.error('Error: ' + msg);
          });
        } else {
          this.toastr.error('Error: ' + err.error.message);
        }
      },
    });
  }
}
