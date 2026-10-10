import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  loginForm:FormGroup;
  mensaje="";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      // Si ya hay token, redirige al perfil
      this.router.navigate(['/perfil']);
    }
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Login = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso:', res);
          // guardar token en localstorage
           this.authService.guardarToken(res.token);
           this.router.navigate(['/perfil']);
        },
        error: (err) => {
          this.mensaje=err.error.error;
          //console.error('Error de login:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
