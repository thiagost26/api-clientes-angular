import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/usuarios"
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  jwtHelper: JwtHelperService = new JwtHelperService();

  private usuarioAutenticado: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token')
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if(token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token) {
      const expired = this.jwtHelper.isTokenExpired(token)

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      return !expired;
    }

    this.usuarioAutenticado = false;

    this.mostrarMenuEmitter.emit(false);

    return false;
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar( username: string, password: string ) : Observable<any> {

    const params = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('grant_type', 'password')


    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }


    return this.http.post( this.tokenURL, params.toString(), { headers: headers })
  }


}
