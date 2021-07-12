import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  key = 'date'
  reverse = true

  tituloPost: string
  nomeDoTema: string

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  usuario: Usuario = new Usuario()
  idUser = environment.idUsuario

  listaPostagem: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private usuarioService: UsuarioService,
    private alertaService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if(environment.tokenUsuario == ''){
      this.router.navigate(['/entrar'])
    }
    
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUsuario(){
    this.usuarioService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicarPostagem(){
    this.tema.idTema = this.idTema
    this.postagem.temaPostagem = this.tema

    this.usuario.idUsuario = this.idUser
    this.postagem.usuarioPostagem = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertaService.showAlertSuccess("Postagem realizada com sucesso!")
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagem = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeDoTema == ''){
      this.getAllTemas
    }else{
      this.temaService.getByNomeTema(this.nomeDoTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

}
