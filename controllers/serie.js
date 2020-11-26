const { request, response } = require('express');
const Serie = require('../models/serie/serie');
const SQLServerConnection = require('./../database');
const fs = require('fs');
const path = require('path');

const findAll = async (req = request, res = response) => {
    const { filter, id } = req.query;
    const { serieRepository } = await SQLServerConnection.getRepositories();

    try{
        if(filter){
            const serieDB = await serieRepository.findSerieByFilter(filter);
            return res.json({ ok: true, serie: serieDB });
        }
        if(id){
            const serieDB = await serieRepository.findGenderBySerie(id);
            return res.json({ ok: true, serie: serieDB });
        }
        const serieDB  = await serieRepository.findAll();
        res.json({ ok: true, serie: serieDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const NumSerieForGender = async (req = request, res = response) => {
    const { serieRepository } = await SQLServerConnection.getRepositories();

    try{
        const serieDB  = await serieRepository.NumSerieForGender();
        res.json({ ok: true, serie: serieDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const save = async (req = request, res = response) =>  {
    const { id, nombre, sinopsis, anio_lanzamiento,id_estudio, cadenaGeneros, cadenaDirectores} = req.body;
    var op = false;
    var url_poster = 'public/posters/';
    console.log(req.body);
    if(req.file){
        url_poster = `${req.file.path}`;
        console.log(url_poster);
    }
    try{
        const { serieRepository } = await SQLServerConnection.getRepositories();
        const movie = new Serie({ id, nombre, sinopsis, anio_lanzamiento, url_poster, id_estudio });
        await serieRepository.save(movie)
            .then(
                op = true
            );
        if(op){
            await serieRepository.AddGendersBySerie(cadenaGeneros, movie.id);
            await serieRepository.AddDirectorsBySerie(cadenaDirectores, movie.id);
        }
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const Directors = async (req = request, res = response) => {
    const { id } = req.query;
    const { serieRepository } = await SQLServerConnection.getRepositories();

    try{
        const serieDB  = await serieRepository.findDirectorBySerie(id);
        res.json({ ok: true, serie: serieDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const Season = async (req = request, res = response) => {
    const { id } = req.query;
    const { serieRepository } = await SQLServerConnection.getRepositories();

    try{
        const serieDB  = await serieRepository.findSeasonBySerie(id);
        res.json({ ok: true, serie: serieDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const DeleteBySerie = async (req = request, res = response) => {
    const { id } = req.params;
    const { serieRepository } = await SQLServerConnection.getRepositories();

    try{
        const image = await serieRepository.Url_poster(id);
        const serieDB  = await serieRepository.DeleteBySerie(id)
            .then(
                fs.unlink(path.resolve(image[0].url_poster),(error)=>{
                    if(error){
                        throw error;
                    }
                    console.log('Archivo eliminado');
                })
            );
        await serieRepository.deleteDirectorsBySerie(id);
        await serieRepository.deleteGendersBySerie(id);
        res.json({ ok: true, serie: serieDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
module.exports = {
    findAll,
    NumSerieForGender,
    save,
    Directors,
    DeleteBySerie,
    Season
};