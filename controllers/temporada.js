const { request, response } = require('express');
const Temporada = require('../models/temporada/temporada');
const SQLServerConnection = require('./../database');
const fs = require('fs');
const path = require('path');

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
    const { id, numero, descripcion,id_serie, cadenaPersonajes} = req.body;
    var op = false;
    
    try{
        const { temporadaRepository } = await SQLServerConnection.getRepositories();
        const movie = new Temporada({  id, numero, descripcion,id_serie });
        await temporadaRepository.save(movie)
            .then(
                op === true
            );
        if(op){
            await temporadaRepository.AddCharactersByMovie(cadenaPersonajes, movie.id);
        }
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
    DeleteBySeason
}