import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.authService
            .tentarLogar(this.usuario.username, this.usuario.password)
            .subscribe(response => {
              const access_token = JSON.stringify(response);
              localStorage.setItem('access_token', access_token)
              if(this.authService.isAuthenticated()) {
                this.router.navigate(['/clientes']);
              }
            }, errorResponse => {
              this.errors = ['Usuário e/ou senha incorretos(s).']
            })
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.usuario.username;
    usuario.password = this.usuario.password;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.cadastrando = false;
        this.usuario.username = '';
        this.usuario.password = '';
        this.errors = [];
      }, errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      })
  }

}
