import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmacaoSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmarSenha(event: any){
    this.confirmacaoSenha = event.target.value
  }

  verificarTipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  cadastrarUsuario(){
    this.usuario.tipoUsuario = this.tipoUser

    if(this.usuario.senhaUsuario != this.confirmacaoSenha){
      alert('As senhas estão incorretas')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuário ' + this.usuario.loginUsuario + ' cadastrado com sucesso')
      }, erro => {
        if(erro.status == 401){
          alert('Usuário já cadastrado')
        }
      })
    }
  }
}
