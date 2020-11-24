const { request } = require('express');
const mssql = require('mssql');
const Movie = require('./pelicula');


const register = ({ sql = mssql, connection }) => {

    const findAll = async () => {
        const sqlQuery = 'select * from ufn_ListarPeliculas()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const save = async (movie = new Movie()) => {
        let sqlQuery;

        const request = await connection.request();
        if (movie.id === 0) {

            sqlQuery = 'exec ups_AgregarPelicula @nombre , @sinopsis , @anio_lanzamiento , @url_poster , @id_video , @id_estudio; ';
            request.input('nombre', sql.VarChar(45), movie.nombre);
            request.input('sinopsis', sql.VarChar(45), movie.sinopsis);
            request.input('anio_lanzamiento', sql.Date, movie.anio_lanzamiento);
            request.input('url_poster', sql.VarChar(45), movie.url_poster);
            request.input('id_video', sql.Int, movie.id_video);
            request.input('id_estudio', sql.Int, movie.id_estudio);

            //TODO: ACABAR
        } else {
            sqlQuery = 'exec ups_EditarPelicula @nombre,@sinopsis,@anio_lanzamiento,@url_poster,@id_video,@id_estudio,@id;';
            request.input('nombre', sql.VarChar(45), movie.nombre);
            request.input('sinopsis', sql.VarChar(45), movie.sinopsis);
            request.input('anio_lanzamiento', sql.Date, movie.anio_lanzamiento);
            request.input('url_poster', sql.VarChar(45), movie.url_poster);
            request.input('id_video', sql.Int, movie.id_video);
            request.input('id_estudio', sql.Int, movie.id_estudio);
            request.input('id', sql.Int, movie.id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const DeleteByMovie = async (id) => {
        const sqlQuery = 'exec EliminarPelicula @id;';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const NumMoviesForGender = async () => {
        const sqlQuery = 'select * from ufn_NumeroPeliculasPorGeneroF()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const ReleaseYear = async () => {
        const sqlQuery = 'select * from ufn_AniosLanzamientos()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findByMovie = async (word) => {
        const sqlQuery = 'select * from ufn_BuscarPelicula(@word);'

        const request = await connection.request();
        request.input('word', sql.VarChar(100), word);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findGenderByMovie = async (id) => {
        const sqlQuery = 'select * from ufn_BuscarGeneroPelicula(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findDirectorByMovie = async (id) => {
        const sqlQuery = 'select * from ufn_BuscarDirectorPorPelicula(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findActorsByMovie = async (id) => {
        const sqlQuery = 'select * from ufn_BuscarActoresPorPelicula(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const findCharactersByMovie = async (id) => {
        const sqlQuery = 'select * from ufn_BuscarPersonajePorPelicula(@id);'

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const AddGendersByMovie = async ( cadena , id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id === 0 ){
            sqlQuery = 'exec ups_AgregarPelicula_genero @cadena,@sepOne';
            request.input('cadena',sql.VarChar(100),cadena);
            request.input('sepOne',sql.Char(1),'-');
        }else{
            sqlQuery = 'exec ups_EditarPelicula_genero @cadena,@sepOne,@id';
            request.input('cadena',sql.VarChar(100),cadena);
            request.input('sepOne',sql.Char(1),'-');
            request.input('id',sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteGendersByMovie = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarPeliculasParaEditar @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const AddDirectorsByMovie = async ( cadena , id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id === 0){
            sqlQuery = 'exec ups_AgregarPeliculaDirector @cadena,@sepOne';
            request.input('cadena', sql.VarChar(200),cadena);
            request.input('sepOne', sql.Char(1),'-');
        }else{
            sqlQuery = 'exec ups_EditarPeliculaDirector @cadena,@sepOne,@id';
            request.input('cadena', sql.VarChar(200),cadena);
            request.input('sepOne', sql.Char(1),'-');
            request.input('id', sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteDirectorsByMovie = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarPeliculaDirector @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const AddCharactersByMovie =async ( cadena , id) => {
        let sqlQuery;
        const request = await connection.request();
        if(id === 0){
            sqlQuery = 'exec ups_AgregarPersonaje @cadena,@sepOne,@sepTwo';
            request.input('cadena', sql.VarChar(200),cadena);
            request.input('sepOne', sql.Char(1),'|');
            request.input('sepTwo', sql.Char(1),'-');
        }else{
            sqlQuery = 'exec ups_EditarPersonaje @cadena,@sepOne,@sepTwo,@id';
            request.input('cadena', sql.VarChar(200),cadena);
            request.input('sepOne', sql.Char(1),'|');
            request.input('sepTwo', sql.Char(1),'-');
            request.input('id', sql.Int,id);
        }
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const deleteCharactersByMovie = async ( id ) => {
        const sqlQuery = 'exec ups_EliminarPersonaje @id';
        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then((vq) => vq.recordsets[0])
            .catch((err) => { throw err; });
    };

    const Url_poster = async (id) => {
        const sqlQuery = 'select url_poster from pelicula where id = @id';
        const request = await connection.request();
        request.input('id',sql.Int,id);
        return request.query(sqlQuery)
        .then((vq) => vq.recordsets[0])
        .catch((err) => { throw err; });
    };

    const Estrenos = async () => {
        const sqlQuery = 'select * from ufn_Estrenos()';
        const request = await connection.request();
        return request.query(sqlQuery)
        .then((vq) => vq.recordsets[0])
        .catch((err) => { throw err; });
    };

    return {
        findAll,
        NumMoviesForGender,
        ReleaseYear,
        findByMovie,
        findGenderByMovie,
        findDirectorByMovie,
        findActorsByMovie,
        findCharactersByMovie,
        save,
        DeleteByMovie,
        AddGendersByMovie,
        Url_poster,
        AddCharactersByMovie,
        AddDirectorsByMovie,
        deleteCharactersByMovie,
        deleteDirectorsByMovie,
        deleteGendersByMovie,
        Estrenos
    }
};

module.exports = { register };