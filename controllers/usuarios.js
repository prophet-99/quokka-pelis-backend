const { request, response } = require('express');
const SQLServerConnection = require('./../database');
const Usuario = require('./../models/usuario/usuario');

const findAll = async (req = request, res = response) => {
    const { role, nameSurname } = req.query;
    try{
        const { usuarioRepository } = await SQLServerConnection.getRepositories();
        if (role){
            const usuariosDB = await usuarioRepository.findByRole(role);
            return res.json({ ok: true, usuarios: usuariosDB });
        }
    
        if (nameSurname){
            const usuariosDB = await usuarioRepository.findByNameOrSurname(nameSurname);
            return  res.json({ ok: true, usuarios: usuariosDB });
        }
    
        const usuariosDB  = await usuarioRepository.findAll();
        res.json({ ok: true, usuarios: usuariosDB });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: err });
    }
};

const save = async (req = request, res = response) =>  {
    const { id, correo, contrasenia, contraseniaPhrase, nombres,
        apellidos, telefono, idRol, genero } = req.body;

    try{
        const { usuarioRepository } = await SQLServerConnection.getRepositories();
        const usuarioReq = new Usuario({ 
            id, correo, contrasenia, contraseniaPhrase, nombres,
            apellidos, telefono, idRol, genero
        });
        await usuarioRepository.save(usuarioReq);
        res.json({ ok: true, msg: 'Usuario guardado correctamente' });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const { usuarioRepository } = await SQLServerConnection.getRepositories();
        await usuarioRepository.deleteById(id);
        res.json({ ok: true, msg: ' Usuario eliminado correctamente' })
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

