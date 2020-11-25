class Temporada{
    constructor({
        id = 0,
        numero,
        descripcion,
        id_serie
    }){
        this.id = id;
        this.numero = numero;
        this.sinopsis = descripcion;
        this.id_serie = id_serie;
    }
};

module.exports = Temporada;