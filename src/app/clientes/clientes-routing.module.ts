import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  { path: '', component: ClientesListaComponent },
  { path: 'novo', component: ClientesFormComponent },
  { path: 'editar/:id', component: ClientesFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
