const { request, response } = require('express');
const Capitulo = require('../models/capitulo/capitulo');
const SQLServerConnection = require('./../database');
const fs = require('fs');
const path = require('path');

const save = async (req = request, res = response) =>  {
    const { id, numero, sinopsis,id_video} = req.body;
    
    try{
        const { capituloRepository } = await SQLServerConnection.getRepositories();
        const movie = new Capitulo({  id, numero, sinopsis,id_video });

        await capituloRepository.save(movie)
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const DeleteByChapter = async (req = request, res = response) => {
    const { id } = req.query;
    const { capituloRepository } = await SQLServerConnection.getRepositories();

    try{
        const capituloaDB  = await capituloRepository.DeleteBySeason(id)
            
        await capituloRepository.deleteCharactersBySeason(id);
        res.json({ ok: true, capitulo: capituloaDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
const findAll = async (req = request, res = response) => {
    const {id } = req.query;
    const { capituloRepository } = await SQLServerConnection.getRepositories();

    try{
        
        const capituloDB  = await capituloRepository.findChapterBySeason(id);
        res.json({ ok: true, capitulo: capituloDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};
module.exports = {
    save,
    DeleteByChapter,
    findAll
}