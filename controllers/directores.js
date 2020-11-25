const { request, response } = require('express');
const Director = require('../models/director/director');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { directorRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const directorDB = await directorRepository.findDirector(word);
            return res.json({ ok: true, directores: directorDB });
        }
        const directorDB  = await directorRepository.findAll();
        res.json({ ok: true, directores: directorDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, nombres, apellidos, nacionalidad, genero } = req.body;
    
    try{
        const { directorRepository } = await SQLServerConnection.getRepositories();
        const director = new Director({ id, nombres, apellidos, nacionalidad, genero });
        await directorRepository.save(director);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteDirector = async (req = request, res = response) => {
    const { id } = req.params;
    try{
    const { directorRepository } = await SQLServerConnection.getRepositories();
    await directorRepository.deleteDirector(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deleteDirector
};