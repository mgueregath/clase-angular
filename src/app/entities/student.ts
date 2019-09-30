export class Student {
    public _id: string;
    public nombre: string;
    public apellido: string;
    public correo: string;

    constructor(nombre: string, apellido: string, correo: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
    }
}