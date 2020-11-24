const { request, response } = require('express');
const Actor = require('../models/actor/actor');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { actorRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const actorDB = await actorRepository.findActor(word);
            return res.json({ ok: true, actores: actorDB });
        }
        const actorDB  = await actorRepository.findAll();
        res.json({ ok: true, actores: actorDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, nombres, apellidos, nacionalidad, genero } = req.query;
    
    try{
        const { actorRepository } = await SQLServerConnection.getRepositories();
        const actor = new Actor({ id, nombres, apellidos, nacionalidad, genero });
        await actorRepository.save(actor);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteActor = async (req = request, res = response) => {
    const { id } = req.query;
    try{
    const { actorRepository } = await SQLServerConnection.getRepositories();
    await actorRepository.deleteActor(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deleteActor
};