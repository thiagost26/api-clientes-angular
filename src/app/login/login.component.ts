import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError: boolean;
  cadastrando: boolean;

  usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.loginService.fazerLogin(this.usuario);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

}
