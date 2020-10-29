const { loadSqlQueries } = require('./../../helpers/load-sql-queries');
const mssql = require('mssql');
const path = require('path'); 

const register = ({ sql = mssql, getConnection }) => {
    const sqlQueries = loadSqlQueries( path.join(__dirname, 'queries') );

    //Métodos para ejecutar las consultas (CRUD, SEARCH)
    const findAll = async () => {
        const cnx = await getConnection();
        const request = await cnx.request();
        return request.query(sqlQueries.findAll)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const findByRole = async ( userRol ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input('userRol', sql.VarChar(100), userRol);
        return request.query(sqlQueries.findByRole)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };
    
    const findByNameOrSurname = async ( nameOrSurname ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input('nameOrSurname', sql.VarChar(100), nameOrSurname);
        return request.query(sqlQueries.findByNameOrSurname)
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