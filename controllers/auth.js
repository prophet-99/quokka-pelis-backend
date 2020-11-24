const { request, response } = require('express');
const SQLServerConnection = require('./../database');
const Auth = require('./../models/auth/auth');

const login = async (req = request, res = response) => {
    const { email, password, phrase } = req. body;
    try{
        const { authRepository } = await SQLServerConnection.getRepositories();
        const auth = new Auth({
            email, password, phrase
        });
        const usuarioDB = await authRepository.login(auth);
        return (usuarioDB.length > 0) ? 
        res.json({ ok: true, usuario: usuarioDB[0] }) :
        res.json({ ok: false, usuario: null })
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    login
};