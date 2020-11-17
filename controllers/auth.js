const { request, response } = require('express');
const SQLServerConnection = require('./../database');
const Usuario = require('./../models/usuario/usuario');

const auth = async (req = request, res = response) => {
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
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const register = async (req = request, res = response) =>  {
    const { id, correo, contrasenia, contraseniaPhrase, nombres,
        apellidos, telefono, idRol, genero } = req.body;

    try{
        const { usuarioRepository } = await SQLServerConnection.getRepositories();
        const usuarioReq = new Usuario({ 
            id, correo, contrasenia, contraseniaPhrase, nombres,
            apellidos, telefono, idRol, genero
        });
        usuarioRepository.save(usuarioReq);
        res.json({ ok: true, msg: 'Usuario guardado correctamente' });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const deleteById = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const { usuarioRepository } = await SQLServerConnection.getRepositories();
        usuarioRepository.deleteById(id);
        res.json({ ok: true, msg: ' Usuario eliminado correctamente' })
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

module.exports = {
    findAll,
    save,
    deleteById
};