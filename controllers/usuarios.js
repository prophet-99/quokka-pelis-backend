const { request, response } = require('express');
const dataClient = require('./../database');
const { sql } = require('./../config');

const findAll = async (req = request, res = response) => {
    const { usuarioRepository } = await dataClient(sql);
    const { recordsets } = await usuarioRepository.findAll();
    const [ usuariosDB ] = recordsets;

    res.json({ ok: true, usuarios: usuariosDB });
};

const searchByRol = async (req = request, res = response) => {
    const userRol = req.params.userRol;

    const { usuarioRepository } = await dataClient(sql);
    const { recordsets } = await usuarioRepository.searchByRol(userRol);
    const [ usuariosDB ] = recordsets;

    res.json({ ok: true, usuarios: usuariosDB });
};

module.exports = {
    findAll,
    searchByRol
};

