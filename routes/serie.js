const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, NumSerieForGender, Season, Directors, save, DeleteBySerie } = require('./../controllers/serie');
const upload = require('./../middlewares/images');

const router = Router();

router.get('/', findAll);
router.get('/NumSerie', NumSerieForGender);
router.get('/Directors', Directors);
router.get('/Season', Season);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('sinopsis', 'El sinopsis es obligatoria').notEmpty(),
    check('anio_lanzamiento', 'El año de lanzamiento es obligatoria').notEmpty(),
    check('url_poster', 'La Direccion del Poster es obligatorios').notEmpty(),
    check('id_estudio', 'El codigo del estudio es obligatorio').notEmpty(),
    check('cadena', 'Los generos son obligatorio').notEmpty(),
    validateFields
], upload.single('image'), save);
router.delete('/',DeleteBySerie);


module.exports = router;