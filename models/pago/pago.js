class Money {
    constructor({
        idSuscr,
        descripcion,
        estado,
        fecha_inicio,
        tipo,
        idUsu,
        monto
    }){
        this.idSuscr = idSuscr;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fecha_inicio = fecha_inicio;
        this.tipo = tipo;
        this.idUsu = idUsu,
        this.monto = monto
    }
};

module.exports = Money;