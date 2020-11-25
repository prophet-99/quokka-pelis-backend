class Capitulo{
    constructor({
        id = 0,
        numero,
        sinopsis,
        id_temporada,
        id_video
    }){
        this.id = id;
        this.numero = numero;
        this.sinopsis = sinopsis;
        this.id_temporada = id_temporada;
        this.id_estudio = id_video;
    }
};

module.exports = Capitulo;