const mssql = require('mssql');
const Director = require('./director');

const register = ({ sql = mssql, connection }) => {
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarDirectore()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findDirector = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarDirector(@word)';
        const request = await connection.request();
        request.input('word', sql.VarChar(45), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (director = new Director()) => {
        let sqlQuery;

        const request = await connection.request();
        if (director.id === 0) {
            sqlQuery = 'exec ups_AgregarDirector @nombres,@apellidos,@nacionalidad,@genero';
            request.input('nombres', sql.VarChar(45), director.nombres);
            request.input('apellidos', sql.VarChar(45), director.apellidos);
            request.input('nacionalidad', sql.VarChar(45), director.nacionalidad);
            request.input('genero', sql.VarChar(45), director.genero);

            //TODO: ACABAR
        } else {
            sqlQuery = 'exec ups_EditarDirector @nombres,@apellidos,@nacionalidad,@genero,@id';
            request.input('nombres', sql.VarChar(45), director.nombres);
            request.input('apellidos', sql.VarChar(45), director.apellidos);
            request.input('nacionalidad', sql.VarChar(45), director.nacionalidad);
            request.input('genero', sql.VarChar(45), director.genero);
            request.input('id', sql.Int, director.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteDirector = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarDirector @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    return{
        findAll,
        findDirector,
        save,
        deleteDirector
    }
};

module.exports = { register };