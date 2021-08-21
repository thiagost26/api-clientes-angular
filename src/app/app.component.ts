import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-clientes';

  mostrarMenu: boolean = false;

  usuarioLogado: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();

    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar,
    );
  }

  logout() {
    this.authService.encerrarSessao();
    this.mostrarMenu = false;
    this.router.navigate(['/login']);
  }

}
