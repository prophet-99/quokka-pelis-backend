const mssql = require('mssql');
const Estudio = require('./estudio');
const estudio = require('./estudio');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarEstudiosCinematograficos()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findEstudio = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarEstudioCinematografico(@word)';
        const request = await connection.request();
        request.input('word', sql.VarChar(50), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (estudio = new Estudio()) => {
        let sqlQuery;

        const request = await connection.request();
        if (estudio.id === 0) {
            sqlQuery = 'exec ups_AgregarEstudioCinematografica @nombre, @sede_principal';
            request.input('nombre', sql.VarChar(45), estudio.nombre);
            request.input('sede_principal', sql.VarChar(45), estudio.sede_principal);
            //TODO: ACABAR
        } else {
            sqlQuery = 'exec ups_EditarEstudioCinematografico @nombre, @sede_principal, @id';
            request.input('nombre', sql.VarChar(45), estudio.nombre);
            request.input('sede_principal', sql.VarChar(45), estudio.sede_principal);
            request.input('id', sql.Int, estudio.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteEstudio = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarEstudioCinematografico @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    return{
        findAll,
        findEstudio,
        save,
        deleteEstudio
    }
};

module.exports = { register };