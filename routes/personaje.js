const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, deletePersonaje } = require('./../controllers/personaje');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('idActor','El nombre es obligatorio').notEmpty(),
    check('idPelicula','El apellido es obligatorio').notEmpty(),
    check('nombre','La nacionalidad es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:id', deletePersonaje);

module.exports = router;