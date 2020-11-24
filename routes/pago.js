/**
 * ROUTE: /api/v1/usuario
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { saveS, reporteBoletaxUsuario } = require('./../controllers/pago');

const router = Router();

router.post('/', [
    check('idSuscr', 'El idSuscripcion es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('estado', 'El estado es obligatorio').notEmpty(),
    check('fecha_inicio', 'La fecha es obligatoria').notEmpty(),
    check('tipo', 'El tipo es obligatorio').notEmpty(),
    check('idUsu', 'El id del Usuario es obligatorio').notEmpty(),
    check('monto', 'El monto es obligatorio').isNumeric(),
    validateFields
], saveS)
router.get('/reporte', reporteBoletaxUsuario);

module.exports = router;