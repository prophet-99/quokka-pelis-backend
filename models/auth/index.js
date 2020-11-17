const mssql = require('mssql');

const register = ({ sql = mssql, connection }) => {
    
    const auth = async () => {
        const sqlQuery = 'select dbo.ufn_loginUsuario(@email, @pass, @phrase)';

        const request = await connection.request();
        request.input('email', sql.VarChar(90), )
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const register = async () => {

    };

    return {
        save,
        deleteById
    }
};

module.exports = { register };