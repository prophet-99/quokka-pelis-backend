const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, deleteEstudio } = require('./../controllers/estudios');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('sede_principal','La sede principal es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:id', deleteEstudio);

module.exports = router;