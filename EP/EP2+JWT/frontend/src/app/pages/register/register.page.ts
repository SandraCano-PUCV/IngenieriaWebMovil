import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage {
  registerForm: FormGroup;

  regiones: string[] = ['Región Metropolitana', 'Valparaíso', 'Biobío'];
  comunas: string[] = ['Seleccione región'];
  
  comunasPorRegion: { [key: string]: string[] } = {
    'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
  };

  constructor(private fb: FormBuilder,private serviceRegister:RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });
   }

   passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  onRegionChange(region: string) {
    this.comunas = this.comunasPorRegion[region] || [];
    this.registerForm.patchValue({ comuna: '' });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const datos: Register = this.registerForm.value;
      this.serviceRegister.register(datos).subscribe({
        next: (res) => {
          console.log('Registro exitoso:', res);
          // Puedes redirigir o mostrar alerta
        },
        error: (err) => {
          console.error('Error en registro:', err.error?.message || err.message);
        }
      })

      console.log('Formulario enviado:', this.registerForm.value);
    
    
    } else {
      this.registerForm.markAllAsTouched();
    }
  }



}
