import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    if(usuario.login === 'usuario@email.com' &&
      usuario.senha === '123') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/clientes']);
    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmitter.emit(false);

      this.router.navigate(['']);
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  logOut() {
    this.usuarioAutenticado = false;
  }
}
