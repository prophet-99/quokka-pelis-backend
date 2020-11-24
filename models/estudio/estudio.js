class Estudio{
    constructor({
        id = 0,
        nombre,
        sede_principal
    }){
        this.id = id;
        this.nombre = nombre;
        this.sede_principal = sede_principal;
    }
};

module.exports = Estudio;