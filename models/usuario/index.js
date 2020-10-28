const { loadSqlQueries } = require('./../../helpers/load-sql-queries');
const mssql = require('mssql');

const register = ({ sql = mssql, getConnection }) => {
    const sqlQueries = loadSqlQueries(__dirname);

    //Métodos para ejecutar las consultas (CRUD, SEARCH)
    const findAll = async () => {
        const cnx = await getConnection();
        const request = await cnx.request();
        return request.query(sqlQueries.findAll); //sqlQueries.nombreArchivoSQL
    };

    const searchByRol = async ( userRol ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input('userRol', sql.VarChar(100), userRol);
        return request.query(sqlQueries.searchByRol);
    };
    

    return{
        findAll,
        searchByRol
    }
};

module.exports = { register };