import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmacaoSenha: string
  tipoUser: string
  idUser: number

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if(environment.tokenUsuario == ""){
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number){
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  confirmarSenha(event: any){
    this.confirmacaoSenha = event.target.value
  }

  verificarTipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  atualizarUsuario(){
    this.usuario.tipoUsuario = this.tipoUser

    if(this.usuario.senhaUsuario != this.confirmacaoSenha){
      alert('As senhas estão incorretas')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuário ' + this.usuario.loginUsuario + ' alterado com sucesso')
        environment.tokenUsuario = ''
        environment.fotoUsuario = ''
        environment.idUsuario = 0
        environment.nomeUsuario = ''
        this.router.navigate(['/entrar'])
      }, erro => {
        if(erro.status == 401){
          alert('Usuário já cadastrado')
        }
      })
    }
  }

}
