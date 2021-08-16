import { ServicoPrestado } from './../servicoPrestado';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  success: boolean = false;
  errors: String[];
  servico: ServicoPrestado;

  constructor(
    private clienteService:ClientesService,
    private service: ServicoPrestadoService
    ) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( response => this.clientes = response );
  }

  onSubmit() {
    this.service
    .salvar(this.servico)
    .subscribe(response => {
      console.log(response)
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    })

  }

}
