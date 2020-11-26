const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { Characters, save, DeleteBySeason } = require('./../controllers/temporada');

const router = Router();

router.get('/Characters', Characters);
router.post('/', [
    check('numero', 'El numero es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('id_serie', 'El codigo de la serie es obligatorio').notEmpty(),
    check('cadena', 'Los personajes son obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/',DeleteBySeason);


module.exports = router;