/**
 * ROUTE: /api/v1/usuario
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save } = require('./../controllers/usuarios');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'La contraseña es obligatoria').notEmpty(),
    check('contraseniaPhrase', 'La frase de contraseña es obligatoria').notEmpty(),
    check('nombres', 'Los nombres son obligatorios').notEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').notEmpty(),
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('idRol', 'El rol es obligatoria').notEmpty(),
    check('idRol', 'El rol debe ser numerico').isNumeric(),
    check('genero', 'El genero es obligatorio').notEmpty(),
    validateFields
], save);

module.exports = router;