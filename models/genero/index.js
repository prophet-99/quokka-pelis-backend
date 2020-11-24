const mssql = require('mssql');
const Genero = require('./genero');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarGeneros()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findGender = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarGenero(@word)';
        const request = await connection.request();
        request.input('word', sql.VarChar(50), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (genero = new Genero()) => {
        let sqlQuery;

        const request = await connection.request();
        if (genero.id === 0) {
            sqlQuery = 'exec ups_AgregarGenero @descripcion';
            request.input('descripcion', sql.VarChar(45), genero.descripcion);

            //TODO: ACABAR
        } else {
            sqlQuery = 'exec ups_EditarGenero @descripcion,@id;';
            request.input('descripcion', sql.VarChar(45), genero.descripcion);
            request.input('id', sql.Int, genero.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteGender = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarGenero @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    return{
        findAll,
        findGender,
        save,
        deleteGender
    }
};

module.exports = { register };