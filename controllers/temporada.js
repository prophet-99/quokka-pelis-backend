const { request, response } = require('express');
const Temporada = require('../models/temporada/temporada');
const SQLServerConnection = require('./../database');
const fs = require('fs');
const path = require('path');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { temporadaRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const temporadaDB = await temporadaRepository.findSeason(word);
            return res.json({ ok: true, temporadas: temporadaDB });
        }
        const temporadaDB  = await temporadaRepository.findAll();
        res.json({ ok: true, temporadas: temporadaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const Characters = async (req = request, res = response) => {
    const { id } = req.query;
    const { temporadaRepository } = await SQLServerConnection.getRepositories();

    try{
        const temporadaDB  = await temporadaRepository.findCharactersBySeason(id);
        res.json({ ok: true, temporada: temporadaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const save = async (req = request, res = response) =>  {
    const { id, numero, descripcion,id_serie} = req.body;
    console.log(req.body.numero)
    try{
        const { temporadaRepository } = await SQLServerConnection.getRepositories();
        const movie = new Temporada({  id, numero, descripcion, id_serie });
        await temporadaRepository.save(movie)
            .then(
            );
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const savePersonajes = async (req = request, res = response) =>  {
    const { cadenaPersonajes, id } = req.body;
    var op = false;
    
    try{
        const { temporadaRepository } = await SQLServerConnection.getRepositories();
        await temporadaRepository.AddCharactersByMovie(cadenaPersonajes, id);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const DeleteBySeason = async (req = request, res = response) => {
    const { id } = req.query;
    const { temporadaRepository } = await SQLServerConnection.getRepositories();

    try{
        const temporadaDB  = await temporadaRepository.DeleteBySeason(id)
            
        await temporadaRepository.deleteCharactersBySeason(id);
        res.json({ ok: true, temporada: temporadaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
module.exports = {
    Characters,
    save,
    DeleteBySeason,
    findAll,
    savePersonajes
}