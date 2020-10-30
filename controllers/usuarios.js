const { request, response } = require('express');
const SQLServerConnection = require('./../database');

const findAll = async (req = request, res = response) => {
    const { role, nameSurname } = req.query;
    const { usuarioRepository } = await SQLServerConnection.getRepositories();

    try{
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

const save = async (req = request, res = response) =>  {
    console.log(req.body);
};

module.exports = {
    findAll,
    save
};

