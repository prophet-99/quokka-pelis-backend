const { request, response } = require('express');
const SQLServerConnection = require('./../database');
const Money = require('./../models/pago/pago');

const saveS = async (req = request, res = response) =>  {
    const { idSuscr, descripcion, estado, fecha_inicio, tipo,
        idUsu, monto } = req.body;
    try{
        const { pagoRepository } = await SQLServerConnection.getRepositories();
        const money = new Money({ 
            idSuscr, descripcion, estado, fecha_inicio, tipo,
            idUsu, monto
        });
        await pagoRepository.saveS(money);
        res.json({ ok: true, msg: 'Funcion guardada correctamente' });
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

const reporteBoletaxUsuario = async (req = request, res = response) => {
    const { idUsu } = req.query;

    try{
        const { pagoRepository } = await SQLServerConnection.getRepositories();
        const Boleta = await pagoRepository.reporteBoletaxUsuario(idUsu);
        res.json({ ok: true, Boleta })
    }catch(err){
        console.log(err);
        res.status(500).json({ ok: false, msg: 'Error de servidor' });
    }
};

module.exports = {
    saveS,
    reporteBoletaxUsuario
};