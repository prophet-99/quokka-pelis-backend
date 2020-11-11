/**
 * ROUTE: /api/v1/rol
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save } = require('./../controllers/roles');

const router = Router();

router.get('/', findAll);
router.post('/',[
    check('id', 'El id es requerido').notEmpty(),
    check('descripcion', 'La descripción es requerida').notEmpty(),
    validateFields
], save);

module.exports = router;