const { request } = require('express');
const mssql = require('mssql');
const Capitulo = require('./capitulo');

const register = ({ sql = mssql, connection }) => {
    const save = async (capitulo = new Capitulo()) => {
        let sqlQuery;

        const request = await connection.request();
        if (movie.id === 0) {

            sqlQuery = 'exec usp_insertarCapitulo @id_temporada , @sinopsis , @numero ,@id_video ; ';
            request.input('numero', sql.Int, capitulo.numero);
            request.input('sinopsis', sql.VarChar(45), capitulo.sinopsis);
            request.input('id_video', sql.Int, capitulo.id_video);
            request.input('id_temporada', sql.Int, capitulo.id_temporada);

        } else {
            sqlQuery = 'exec usp_actualizarCapitulo @id, @id_temporada , @sinopsis , @numero ,@id_video;';
            request.input('numero', sql.Int, capitulo.numero);
            request.input('sinopsis', sql.VarChar(45), capitulo.sinopsis);
            request.input('id_video', sql.Int, capitulo.id_video);
            request.input('id_temporada', sql.Int, capitulo.id_temporada);
            request.input('id', sql.Int, capitulo.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const DeleteByChapter = async (id) => {
        const sqlQuery = 'exec usp_eliminarCapitulo @id;';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findChapterBySeason = async (id) => {
        const sqlQuery = 'select * from ufn_CapitulosTemporada(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    return {
        save,
        DeleteByChapter,
        findChapterBySeason
    }
};
module.exports = { register };