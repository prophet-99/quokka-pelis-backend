const { request, response } = require('express');
const Estudio = require('../models/estudio/estudio');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { word } = req.query;
    const { estudioRepository } = await SQLServerConnection.getRepositories();

    try{
        if(word){
            const estudioDB = await estudioRepository.findEstudio(word);
            return res.json({ ok: true, estudios: estudioDB });
        }
        const estudioDB  = await estudioRepository.findAll();
        res.json({ ok: true, estudios: estudioDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, nombre, sede_principal } = req.body;
    
    try{
        const { estudioRepository } = await SQLServerConnection.getRepositories();
        const estudio = new Estudio({ id, nombre, sede_principal });
        await estudioRepository.save(estudio);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteEstudio = async (req = request, res = response) => {
    const { id } = req.params;
    try{
    const { estudioRepository } = await SQLServerConnection.getRepositories();
    await estudioRepository.deleteEstudio(id);
    res.json({ok: true, msg: 'Se guardó correctamente'});
    }catch(err){
        console.log(err);
        res.status(500).json({ok: false, msg: 'Error de Servidor'});
    }
};

module.exports = {
    findAll,
    save,
    deleteEstudio
};