const mssql = require('mssql');

const Video = require('./video');

const register = ({ sql = mssql, connection }) => {
    
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarVideos()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const findVideo = async ( word ) => {
        const sqlQuery = 'select * from ufn_BuscarVideo(@word)';

        const request = await connection.request();
        request.input('word',sql.VarChar(45),word);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const save = async ( video = new Video() ) => {
        let sqlQuery;

        const request = await connection.request();
        if (video.id === 0){
            sqlQuery = 'exec ups_AgregarVideo @url_video,@valoracion,@duracion';
            request.input('url_video', sql.VarChar(100), video.url_video);
            request.input('valoracion', sql.Int, video.valoracion);
            request.input('duracion', sql.VarChar(45), video.duracion);
            //TODO: ACABAR
        }else {
            sqlQuery = 'exec ups_EditarVideo @url_video,@valoracion,@duracion,@id';
            request.input('url_video', sql.VarChar(100), video.url_video);
            request.input('valoracion', sql.Int, video.valoracion);
            request.input('duracion', sql.VarChar(45), video.duracion);
            request.input('id', sql.Int, video.id);
        }

        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const deleteVideo = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarVideo @id';

        const request = await connection.request();
        request.input('id',sql.Int,id);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    return {
        findAll,
        save,
        findVideo,
        deleteVideo
    }
};

module.exports = { register };