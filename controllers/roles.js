const { request, response } = require('express');
const SQLServerConnection = require('./../database');
const Rol = require('../models/rol/rol');

const findAll = async (req = request, res = response) => {
    try{
        const { rolRepository } = await SQLServerConnection.getRepositories();
        const roles = await rolRepository.findAll();
        res.json({ ok: true, roles });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const save = async (req = request, res = response) => {
    const { id, descripcion } = req.body;
    try{
        const { rolRepository } = await SQLServerConnection.getRepositories();
        const role = new Rol({ id, descripcion });
        await rolRepository.save(role);
        res.json({ ok: true, msg: 'Se guardó correctamente' });        
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

module.exports = {
    findAll,
    save
};