const mssql = require('mssql');
const Actor = require('./actor');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarActores()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findActor = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarActor(@word)';
        const request = await connection.request();
        request.input('word', sql.VarChar(50), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (actor = new Actor()) => {
        let sqlQuery;

        const request = await connection.request();
        if (actor.id === 0) {
            sqlQuery = 'exec usp_AgregarActor @nombres,@apellidos,@nacionalidad,@genero';
            request.input('nombres', sql.VarChar(45), actor.nombres);
            request.input('apellidos', sql.VarChar(45), actor.apellidos);
            request.input('nacionalidad', sql.VarChar(45), actor.nacionalidad);
            request.input('genero', sql.Int, actor.genero);

            //TODO: ACABAR
        } else {
            sqlQuery = 'exec usp_EditarActor @nombres,@apellidos,@nacionalidad,@genero,@id';
            request.input('nombres', sql.VarChar(45), actor.nombres);
            request.input('apellidos', sql.VarChar(45), actor.apellidos);
            request.input('nacionalidad', sql.VarChar(45), actor.nacionalidad);
            request.input('genero', sql.Int, actor.genero);
            request.input('id', sql.Int, actor.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteActor = async ( id ) => {
        const sqlQuery = 'exec usp_EliminarActor @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    return{
        findAll,
        findActor,
        save,
        deleteActor
    }
};

module.exports = { register };