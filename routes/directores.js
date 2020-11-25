const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, deleteDirector } = require('./../controllers/directores');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('nombres','El nombre es obligatorio').notEmpty(),
    check('apellidos','El apellido es obligatorio').notEmpty(),
    check('nacionalidad','La nacionalidad es obligatorio').notEmpty(),
    check('genero','El genero es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:id', deleteDirector);

module.exports = router;