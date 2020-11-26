const { request, response } = require('express');
const Personaje = require('../models/personaje/personaje');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { personajeRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const personajeDB = await personajeRepository.findPersonaje(word);
            return res.json({ ok: true, personajes: personajeDB });
        }
        const personajeDB  = await personajeRepository.findAll();
        res.json({ ok: true, personajes: personajeDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, idActor, idPelicula, nombre } = req.body;
    
    try{
        const { personajeRepository } = await SQLServerConnection.getRepositories();
        const personaje = new Personaje({ id, idPelicula, idActor, nombre });
        await personajeRepository.save(personaje);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deletePersonaje = async (req = request, res = response) => {
    const { id } = req.params;
    try{
    const { personajeRepository } = await SQLServerConnection.getRepositories();
    await personajeRepository.deletePersonaje(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deletePersonaje
};