import { Postagem } from "./Postagem"

export class Tema{
    public idTema: number
    public descricao: string
    public temaPostagens: Postagem[]
}