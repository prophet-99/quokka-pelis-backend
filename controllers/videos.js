const { request, response } = require('express');
const Video = require('../models/video/video');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { videoRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const videoDB = await videoRepository.findVideo(word);
            return res.json({ ok: true, videos: videoDB });
        }
        const videoDB  = await videoRepository.findAll();
        res.json({ ok: true, videos: videoDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, url_video, valoracion, duracion } = req.body;
    console.log(req.body);
    console.log(url_video+'-'+valoracion);
    try{
        const { videoRepository } = await SQLServerConnection.getRepositories();
        const video = new Video({ id, url_video, valoracion, duracion });
        await videoRepository.save(video);
        console.log('Estoy despues del video repository');
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteVideo = async (req = request, res = response) => {
    const { id } = req.query;
    try{
    const { videoRepository } = await SQLServerConnection.getRepositories();
    await videoRepository.deleteVideo(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deleteVideo
};