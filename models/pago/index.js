const mssql = require('mssql');
const pago = require('./pago');

const register = ({ sql = mssql, connection }) => {

    const saveS = async ( money = new Money() ) => {
        const sqlQuery = 
        `EXECUTE usp_InsertarSusPago 
        @id_suscripcion,
        @descripcion,
        @estado,
        @fecha_inicio,
        @tipo,
        @usuario_id,
        @monto;`;

        const request = await connection.request();
        request.input('id_suscripcion', sql.Int, money.idSuscr);
        request.input('descripcion', sql.VarChar(45), money.descripcion);
        request.input('estado', sql.TinyInt, money.estado);
        request.input('fecha_inicio', sql.Date, money.fecha_inicio);
        request.input('tipo', sql.VarChar(45), money.tipo);
        request.input('usuario_id', sql.Int, money.idUsu);
        request.input('monto', sql.Int, money.monto);

        return request.query(sqlQuery)
            .then( (vq) => vq.recordsets[0] )
            .catch( (err) => { throw err; } );
    };

const reporteBoletaxUsuario = async (idUsuario) => {
    const sqlQuery = 'EXECUTE usp_Boleta @idUsu';

    const request = await connection.request();
    request.input('idUSu',sql.Int,idUsuario)
    return request.query(sqlQuery)
        .then( (vq) => vq.recordsets[0] )
        .catch( (err) => { throw err; } ); 
};
    return{
    saveS,
    reporteBoletaxUsuario
    }
};

module.exports = { register };
