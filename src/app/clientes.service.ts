import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) {
  }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>( `${this.apiUrl}`, cliente);
  }

  atualizar(cliente: Cliente) : Observable<any> {
    return this.http.put<Cliente>( `${this.apiUrl}/${cliente.id}`, cliente);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>( `${this.apiUrl}`);
  }

  getClienteById(id: number) : Observable<Cliente> {
    return this.http.get<any>( `${this.apiUrl}/${id}`);
  }

  deletar(cliente: Cliente) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${cliente.id}`);
  }


}
