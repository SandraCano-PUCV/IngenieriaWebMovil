import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {
  loginForm:FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Login = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso:', res);
          // Redirigir o guardar token
        },
        error: (err) => {
          console.error('Error de login:', err.error?.message || err.message);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
