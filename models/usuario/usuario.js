class Usuario{
    constructor({
        id = 0,
        correo,
        contrasenia,
        contraseniaPhrase,
        nombres,
        apellidos,
        telefono,
        idRol,
        genero
    }){
        this.id = id;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.contraseniaPhrase = contraseniaPhrase;
        this.nombres= nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.idRol = idRol;
        this.genero = genero;
    }
};

module.exports = Usuario;