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
        res.status(500).json({ ok: false, msg: err });
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
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { id } = req.params;
    try{
        const { rolRepository } = await SQLServerConnection.getRepositories();
        await rolRepository.deleteById(id);
        res.json({ ok: true, msg: 'Eliminado correctamente' });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAll,
    save,
    deleteById
};