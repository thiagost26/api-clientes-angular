import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login',
  },
  {
    path: 'clientes',
      loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'servicos-prestados',
      loadChildren: () => import('./servico-prestado/servico-prestado.module').then(m => m.ServicoPrestadoModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
