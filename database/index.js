const sql = require('mssql');
const usuario = require('./../models/usuario');

const dataClient = async (config) => {
    let pool = null;

    const closePool = async () => {
        try{
            await pool.close();
        }catch(error){
            pool = null;
            console.log(error);
        }
    };
    
    const getConnection = async () => {
        try{
            if(pool) return pool;

            pool = await sql.connect(config);
            pool.on('error', async (err) => {
                console.log(err);
                await closePool();
            });
            return pool;
        }catch(error){
            console.log(error);
            pool = null;
        }
    };

    return {
        usuarioRepository: usuario.register({ sql, getConnection })
    };
};

module.exports = dataClient;
