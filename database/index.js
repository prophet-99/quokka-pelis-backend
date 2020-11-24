const mssql = require('mssql');

const { sql } = require('./../config');
const usuario = require('./../models/usuario');
const rol = require('./../models/rol');
const auth = require('./../models/auth');
const pelicula = require('./../models/pelicula');
const genero = require('./../models/genero');
const video = require('./../models/video');
const actor = require('./../models/actor');
const director = require('./../models/director');
const estudio = require('./../models/estudio');

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
            peliculaRepository: pelicula.register({mssql, connection}),
            generoRepository: genero.register({mssql, connection}),
            videoRepository: video.register({mssql, connection}),
            actorRepository: actor.register({mssql, connection}),
            directorRepository: director.register({mssql, connection}),
            estudioRepository: estudio.register({mssql, connection})
        }
    }
}

module.exports = new SQLServerConnection();
