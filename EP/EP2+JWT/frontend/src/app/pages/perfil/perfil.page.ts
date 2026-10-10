import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:false
})
export class PerfilPage implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  usuario: any;
  ngOnInit() {
    if (!this.authService.estaAutenticado()) {
      // Si ya hay token, redirige al perfil
      this.router.navigate(['/']);
    }

    this.authService.obtenerPerfil().subscribe({
      next: (res: any) => {
        this.usuario = res.user;
      },
      error: (err) => {
        console.error('Error al obtener perfil:', err);
      }
    });

  }

}
