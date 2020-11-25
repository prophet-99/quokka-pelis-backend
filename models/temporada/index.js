const { request } = require('express');
const mssql = require('mssql');
const Temporada = require('./temporada');

const register = ({ sql = mssql, connection }) => {
    const save = async (temporada = new Temporada()) => {
        let sqlQuery;

        const request = await connection.request();
        if (temporada.id === 0) {

            sqlQuery = 'exec usp_insertarTemporada @id_serie , @descripcion , @numero; ';
            request.input('numero', sql.Int, temporada.numero);
            request.input('descripcion', sql.VarChar(100), temporada.descripcion);
            request.input('id_serie', sql.Int, temporada.id_serie);

        } else {
            sqlQuery = 'exec usp_actualizarTemporada @id, @id_serie , @descripcion , @numero;';
            request.input('numero', sql.Int, temporada.numero);
            request.input('descripcion', sql.VarChar(100), temporada.descripcion);
            request.input('id_serie', sql.Int, temporada.id_serie);
            request.input('id', sql.Int, temporada.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const DeleteBySeason = async (id) => {
        const sqlQuery = 'exec usp_eliminarTemporada @id;';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const AddCharactersBySeason =async ( cadena, id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id === 0){ //cadena: 1,SuperMan-2,La mujer maravilla-3,Quien no debe ser nombrado
            sqlQuery = 'exec usp_insertarPersonajeTemporada @cadena';
            request.input('cadena', sql.VarChar(150),cadena);
        }else{
            sqlQuery = 'exec ups_EditarPersonaje @id, @cadena';
            request.input('cadena', sql.VarChar(150),cadena);
            request.input('id', sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const deleteCharactersBySeason = async ( id ) => {
        const sqlQuery = 'exec usp_eliminarPersonajeTemporada @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findCharactersBySeason = async (id) => {
        const sqlQuery = 'select * from ufn_PersonajesTemporada(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    return {
        save,
        DeleteBySeason,
        AddCharactersBySeason,
        deleteCharactersBySeason,
        findCharactersBySeason
    }
};
module.exports = { register };