class Pelicula{
    constructor({
        id = 0,
        nombre,
        sinopsis,
        anio_lanzamiento,
        url_poster,
        id_estudio
    }){
        this.id = id;
        this.nombre = nombre;
        this.sinopsis = sinopsis;
        this.anio_lanzamiento = anio_lanzamiento;
        this.url_poster = url_poster;
        this.id_estudio = id_estudio;
    }
};

module.exports = Pelicula;