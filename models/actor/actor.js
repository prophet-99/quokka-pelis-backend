class Actor{
    constructor({
        id = 0,
        nombres,
        apellidos,
        nacionalidad,
        genero
    }){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nacionalidad = nacionalidad;
        this.genero = genero;
    }
};

module.exports = Actor;