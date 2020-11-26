const { request } = require('express');
const mssql = require('mssql');
const Serie = require('./serie');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarSeries()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findAllMant = async () => {
        const sqlQuery = 'select * from ufn_ListarSeriesMant()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (serie = new Serie()) => {
        let sqlQuery;

        const request = await connection.request();
        if (serie.id == 0) {

            sqlQuery = 'exec usp_insertarSerie @nombre , @sinopsis , @anio_lanzamiento , @url_poster , @id_estudio; ';
            request.input('nombre', sql.VarChar(45), serie.nombre);
            request.input('sinopsis', sql.Text, serie.sinopsis);
            request.input('anio_lanzamiento', sql.Date, serie.anio_lanzamiento);
            request.input('url_poster', sql.VarChar(100), serie.url_poster);
            request.input('id_estudio', sql.Int, serie.id_estudio);

        } else {
            sqlQuery = 'exec usp_actualizarSerie @id, @nombre,@sinopsis,@anio_lanzamiento,@url_poster,@id_estudio;';
            request.input('nombre', sql.VarChar(45), serie.nombre);
            request.input('sinopsis', sql.Text, serie.sinopsis);
            request.input('anio_lanzamiento', sql.Date, serie.anio_lanzamiento);
            request.input('url_poster', sql.VarChar(100), serie.url_poster);
            request.input('id_estudio', sql.Int, serie.id_estudio);
            request.input('id', sql.Int, serie.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const DeleteBySerie = async (id) => {
        const sqlQuery = 'exec usp_eliminarSerie @id;';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findBySerie = async (id) => {
        const sqlQuery = 'select * from ufn_unaSerie(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findSerieByFilter = async (filter) => {
        const sqlQuery = 'select * from ufn_ListarSeriesFiltro(@filter);'

        const request = await connection.request();
        request.input('filter', sql.VarChar(45), filter);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findGenderBySerie = async (id) => {
        const sqlQuery = 'select * from ufn_GeneroSerie(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findDirectorBySerie = async (id) => {
        const sqlQuery = 'select * from ufn_DirectorSerie(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const findSeasonBySerie = async (id) => {
        const sqlQuery = 'select * from ufn_TemporadasSerie(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const AddGendersBySerie = async ( cadena, id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id == 0 ){ //cadena: 4-7-3-5
            sqlQuery = 'exec usp_insertarGeneroSerie @cadena';
            request.input('cadena',sql.VarChar(100),cadena);
        }else{
            sqlQuery = 'exec usp_actualizarGeneroSerie @id,@cadena';
            request.input('cadena',sql.VarChar(100),cadena);
            request.input('id',sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const deleteGendersBySerie = async ( id ) => {
        const sqlQuery = 'exec usp_eliminarGeneroSerie @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const AddDirectorsBySerie = async ( cadena, id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id == 0){ //cadena: 2-5-8-9.10
            sqlQuery = 'exec usp_insertarDirectorSerie @cadena';
            request.input('cadena', sql.VarChar(100),cadena);
        }else{
            sqlQuery = 'exec usp_actualizarDirectorSerie @id,@cadena';
            request.input('cadena', sql.VarChar(100),cadena);
            request.input('id', sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const deleteDirectorsBySerie = async ( id ) => {
        const sqlQuery = 'exec usp_eliminarDirectorSerie @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const NumSerieForGender = async () => {
        const sqlQuery = 'select * from ufn_NumeroSeriesGenero()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };
    const Url_poster = async (id) => {
        const sqlQuery = 'select url_poster from serie where id = @id';
        const request = await connection.request();
        request.input('id',sql.Int,id);
        return request.query(sqlQuery)
        .then((vq) => vq.recordsets[0])
        .catch((err) => { throw err; });
    };
    return {
        findAll,
        save,
        DeleteBySerie,
        findBySerie,
        findGenderBySerie,
        findDirectorBySerie,
        findSeasonBySerie,
        AddGendersBySerie,
        deleteGendersBySerie,
        AddDirectorsBySerie,
        deleteDirectorsBySerie,
        NumSerieForGender,
        Url_poster,
        findSerieByFilter,
        findAllMant,
    }    
};
module.exports = { register };