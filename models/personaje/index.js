const mssql = require('mssql');
const Personaje = require('./personaje');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarPersonajes()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findPersonaje = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarPersonaje(@word)';
        const request = await connection.request();
        request.input('word', sql.VarChar(50), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (personaje = new Personaje()) => {
        let sqlQuery;

        const request = await connection.request();
        if (personaje.id === 0) {
            sqlQuery = 'exec ups_AgregarPersonaje @idActor,@idPelicula,@nombre';
            request.input('idActor', sql.Int, personaje.idActor);
            request.input('idPelicula', sql.Int, personaje.idPelicula);
            request.input('nombre', sql.VarChar(50), personaje.nombre);

            //TODO: ACABAR
        } else {
            sqlQuery = 'exec ups_EditarPersonaje @idActor,@idPelicula,@nombre,@id';
            request.input('idActor', sql.Int, personaje.idActor);
            request.input('idPelicula', sql.Int, personaje.idPelicula);
            request.input('nombre', sql.VarChar(50), personaje.nombre);
            request.input('id', sql.Int, personaje.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deletePersonaje = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarP @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    return{
        findAll,
        findPersonaje,
        save,
        deletePersonaje
    }
};

module.exports = { register };