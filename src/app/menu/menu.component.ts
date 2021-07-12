import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nomeUsuario = environment.nomeUsuario
  fotoUsuario = environment.fotoUsuario
  idUser = environment.idUsuario

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.fotoUsuario = ''
    environment.idUsuario = 0
    environment.nomeUsuario = ''
    environment.tokenUsuario = ''
  }

}
