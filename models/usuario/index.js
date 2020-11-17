const mssql = require('mssql');
const Usuario = require('./usuario');

const register = ({ sql = mssql, connection }) => {
    
    const findAll = async () => {
        const sqlQuery = 'select * from ufn_findAllUsuarios()';

        const request = await connection.request();
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } ); 
    };

    const findByRole = async ( userRol ) => {
        const sqlQuery = 'select * from ufn_searchUsuarioByRol(@userRol)'

        const request = await connection.request();
        request.input('userRol', sql.VarChar(100), userRol);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };
    
    const findByNameOrSurname = async ( nameOrSurname ) => {
        const sqlQuery = 'select * from ufn_searchUsuarioByNombresOrApellidos(@nameOrSurname)'

        const request = await connection.request();
        request.input('nameOrSurname', sql.VarChar(100), nameOrSurname);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };

    const save = async ( usuario = new Usuario() ) => {
        const sqlQuery = `execute usp_insertUpdateUsuario @id, @correo, @contrasenia, @phrase, 
            @nombres, @apellidos, @telefono, @idRol, @genero`;

        const request = await connection.request();
        request.input('id', sql.Int, usuario.id);
        request.input('correo', sql.VarChar(90), usuario.correo);
        request.input('contrasenia', sql.VarChar(mssql.MAX), usuario.contrasenia);
        request.input('phrase', sql.VarChar(mssql.MAX), usuario.contraseniaPhrase);
        request.input('nombres', sql.VarChar(45), usuario.nombres);
        request.input('apellidos', sql.VarChar(45), usuario.apellidos);
        request.input('telefono', sql.VarChar(45), usuario.telefono);
        request.input('idRol', sql.Int, usuario.idRol);
        request.input('genero', sql.VarChar(30), usuario.genero);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };

    const deleteById = async ( id ) => {
        const sqlQuery = `update usuario set estado = 0 where id = @id`;

        const request = await connection.request();
        request.input('id', sql.Int, id);
        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };

    return{
        findAll,
        findByRole,
        findByNameOrSurname,
        save,
        deleteById
    }
};

module.exports = { register };