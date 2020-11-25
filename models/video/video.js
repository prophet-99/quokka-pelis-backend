class Video{
    constructor({
        id = 0,
        url_video,
        valoracion,
        duracion
    }){
        this.id = id;
        this.url_video = url_video;
        this.valoracion = valoracion;
        this.duracion = duracion;
    }
};

module.exports = Video;