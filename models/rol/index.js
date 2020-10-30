const mssql = require('mssql');

const Rol = require('./rol');

const register = ({ sql = mssql, connection }) => {
    
    const findAll = async () => {
        const sqlQuery = 'select id, descripcion from rol';

        const request = await connection.request();
        return request.query(sqlQueries.findAll)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const save = async ( rol = new Rol() ) => {
        let sqlQuery;

        const request = await connection.request();
        if (rol.id === 0){
            sqlQuery = 'insert into rol(descripcion) values(@description)';
            request.input()
            //TODO: ACABAR
        }else {
            sqlQuery = 'update rol set descripcion = @description where id = @idRole';
        }

        return request.query(sqlQueries.findAll)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const deleteById = async ( idRole ) => {
        const sqlQuery = 'delete rol where id = @idRole';

        const request = await connection.request();
        return request.query(sqlQueries.findAll)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    return {
        findAll,
        save,
        deleteById
    }
};

module.exports = { register };