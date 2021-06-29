import { Postagem } from "./Postagem"

export class Usuario{
    public idUsuario: number
    public nomeUsuario: string
    public loginUsuario: string
    public senhaUsuario: string
    public fotoUsuario: string
    public tipoUsuario: string
    public listaPostagens: Postagem[]
}