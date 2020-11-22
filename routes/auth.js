/**
 * ROUTE: /api/v1/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { login } = require('./../controllers/auth');

const router = Router();

router.post('/', [
    check('email', 'El email es requerido').notEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    check('phrase', 'La frase secreta es requerida').notEmpty(),
    validateFields
], login);

module.exports = router;