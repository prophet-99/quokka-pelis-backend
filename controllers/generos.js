const { request, response } = require('express');
const Genero = require('../models/genero/genero');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { generoRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const generoDB = await generoRepository.findGender(word);
            return res.json({ ok: true, generos: generoDB });
        }
        const generoDB  = await generoRepository.findAll();
        res.json({ ok: true, generos: generoDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, descripcion } = req.body;
    
    try{
        const { generoRepository } = await SQLServerConnection.getRepositories();
        const genero = new Genero({ id, descripcion });
        await generoRepository.save(genero);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteGender = async (req = request, res = response) => {
    const { id } = req.params;
    try{
    const { generoRepository } = await SQLServerConnection.getRepositories();
    await generoRepository.deleteGender(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deleteGender
};