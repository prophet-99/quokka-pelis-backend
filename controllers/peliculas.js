const { request, response } = require('express');
const Pelicula = require('../models/pelicula/pelicula');
const SQLServerConnection = require('./../database');
const fs = require('fs');
const path = require('path');

const findAll = async (req = request, res = response) => {
    const { word, id } = req.query;
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const peliculaDB = await peliculaRepository.findByMovie(word);
            return res.json({ ok: true, peliculas: peliculaDB });
        }
        if(id){
            const peliculaDB = await peliculaRepository.findGenderByMovie(id);
            return res.json({ ok: true, peliculas: peliculaDB });
        }
        const peliculaDB  = await peliculaRepository.findAll();
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const NumMoviesForGender = async (req = request, res = response) => {
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.NumMoviesForGender();
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const ReleaseYear = async (req = request, res = response) => {
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.ReleaseYear();
        res.json({ ok: true, peliculasPorAño: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const Directors = async (req = request, res = response) => {
    const { id } = req.query;
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.findDirectorByMovie(id);
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const Actors = async (req = request, res = response) => {
    const { id } = req.query;
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.findActorsByMovie(id);
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const Characters = async (req = request, res = response) => {
    const { id } = req.query;
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.findCharactersByMovie(id);
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) =>  {
    const { id, nombre, sinopsis, anio_lanzamiento, id_video, id_estudio,
        cadenaGeneros, cadenaDirectores, cadenaPersonajes } = req.body;
    var op = false;
    var url_poster = 'public/posters/';
    if(req.file){
        url_poster = `${req.file.path}`;
        console.log(url_poster);
    }
    try{
        const { peliculaRepository } = await SQLServerConnection.getRepositories();
        const movie = new Pelicula({ id, nombre, sinopsis, anio_lanzamiento, url_poster, id_video, id_estudio });
        await peliculaRepository.save(movie)
            .then(
                op === true
            );
        if(op){
            await peliculaRepository.AddGenderByMovie(cadenaGeneros, movie.id);
            await peliculaRepository.AddCharactersByMovie(cadenaDirectores, movie.id);
            await peliculaRepository.AddDirectorsByMovie(cadenaPersonajes, movie.id);
        }
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const DeleteByMovie = async (req = request, res = response) => {
    const { id } = req.query;
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const image = await peliculaRepository.Url_poster(id);
        const peliculaDB  = await peliculaRepository.DeleteByMovie(id)
            .then(
                fs.unlink(path.resolve(image[0].url_poster),(error)=>{
                    if(error){
                        throw error;
                    }
                    console.log('Archivo eliminado');
                })
            );
        await peliculaRepository.deleteCharactersByMovie(id);
        await peliculaRepository.deleteDirectorsByMovie(id);
        await peliculaRepository.deleteGendersByMovie(id);
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const Estrenos = async (req = request, res = response) => {
    const { peliculaRepository } = await SQLServerConnection.getRepositories();

    try{
        const peliculaDB  = await peliculaRepository.Estrenos();
        res.json({ ok: true, peliculas: peliculaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

module.exports = {
    findAll,
    NumMoviesForGender,
    ReleaseYear,
    Directors,
    Actors,
    Characters,
    save,
    DeleteByMovie,
    Estrenos
};