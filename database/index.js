const mssql = require('mssql');

const { sql } = require('./../config');
const usuario = require('./../models/usuario');
const rol = require('./../models/rol');
const auth = require('./../models/auth');
const serie = require('./../models/serie');
const temporada = require('./../models/temporada');
const capitulo = require('./../models/capitulo');

class SQLServerConnection{
    static instance;
    poolConnection;

    constructor(){
        if (!!SQLServerConnection.instance){
            return SQLServerConnection.instance;
        }
        SQLServerConnection.instance = this;
        this.getConnection();
    }

    async closeConnection(){
        try{
            await this.poolConnection.close();
        }catch(error){
            this.poolConnection = null;
            console.log(error);
        }
    }

    async getConnection(){
        try{
            if(this.poolConnection) return this.poolConnection;
            
            this.poolConnection = await mssql.connect(sql);
            this.poolConnection.on('error', async (err) => {
                console.log(err);
                await closePoolConnection();
            });
        }catch(error){
            console.log(error);
            this.poolConnection = null;
        }
    }

    async getRepositories(){
        const connection = await this.getConnection();
        return {
            usuarioRepository: usuario.register({ mssql, connection }),
            rolRepository: rol.register({ mssql, connection }),
            authRepository: auth.register({ mssql, connection }),
            serieRepository: serie.register({ mssql, connection }),
            temporadaRepository: temporada.register({ mssql, connection }),
            capituloRepository: capitulo.register({ mssql, connection })
        }
    }
}

module.exports = new SQLServerConnection();
