import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaServices: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.tokenUsuario == ''){
      this.router.navigate(['/entrar'])
    }

    if(environment.tipoUsuario != 'Admin'){
      this.alertas.showAlertInfo("Você precisa ser adm para acessar esta rota")
      this.router.navigate(['/inicio'])
    }

    this.findAllTema()
  }


  findAllTema(){
    this.temaServices.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrarTema(){
    this.temaServices.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema cadastrado com sucesso')
      this.findAllTema()
      this.tema = new Tema()
    })
  }
}
