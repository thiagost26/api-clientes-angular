import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service
          .getClienteById(this.id)
          .subscribe(
            response => this.cliente = response,
            errorResponse => this.cliente = new Cliente()
          )
      }
    })
  }

  onSubmit() {
    if(this.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.']
        })

    } else {

      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes'])
  }

  keyPressOnlyCharacters(event) {
    var letras = String.fromCharCode(event.keyCode);

    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z_ ]/.test(letras)) {
      console.log(letras)
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressOnlyNumerics(event) {
    var numeros = String.fromCharCode(event.keyCode);

    // Allow numbers, alpahbets, space, underscore
    if (/[0-9]/.test(numeros)) {
      console.log(numeros)
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


}
