/* Podríamos haber creado una interface export interface..., pero la clase hace lo
mismo y más dado que puedes implementar funcionalidad */
export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) { }

}
