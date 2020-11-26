class Personaje{
    constructor({
        id = 0,
        idPelicula,
        idActor,
        nombre
    }){
        this.id = id;
        this.idPelicula = idPelicula;
        this.idActor = idActor;
        this.nombre = nombre;
    }
};

module.exports = Personaje;