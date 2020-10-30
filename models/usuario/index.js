const mssql = require('mssql');

const register = ({ sql = mssql, connection }) => {
    
    //Métodos para ejecutar las consultas (CRUD, SEARCH)
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_findAllUsuarios();';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const findByRole = async ( userRol ) => {
        const sqlQuery = 'select * from ufn_searchUsuarioByRol(@userRol);'

        const request = await connection.request();
        request.input('userRol', sql.VarChar(100), userRol);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };
    
    const findByNameOrSurname = async ( nameOrSurname ) => {
        const sqlQuery = 'select * from ufn_searchUsuarioByNombresOrApellidos(@nameOrSurname);'

        const request = await connection.request();
        request.input('nameOrSurname', sql.VarChar(100), nameOrSurname);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); ;
    };

    return{
        findAll,
        findByRole,
        findByNameOrSurname
    }
};

module.exports = { register };