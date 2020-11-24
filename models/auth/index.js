const mssql = require('mssql');
const Auth = require('./auth');

const register = ({ sql = mssql, connection }) => {
    
    const login = async (auth = new Auth()) => {
        const sqlQuery = 'select * from ufn_loginUsuario(@email, @password, @phrase)';

        const request = await connection.request();
        request.input('email', sql.VarChar(90), auth.email);
        request.input('password', sql.VarChar(90), auth.password);
        request.input('phrase', sql.VarChar(90), auth.phrase);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    return {
        login
    }
};

module.exports = { register };