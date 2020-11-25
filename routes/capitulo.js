const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, DeleteByChapter } = require('./../controllers/capitulo');
const upload = require('./../middlewares/images');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('numero', 'El numero es obligatorio').notEmpty(),
    check('sinopsis', 'El sinopsis es obligatoria').notEmpty(),
    check('id_video', 'El codigo del video es obligatorio').notEmpty(),
    validateFields
], upload.single('image'), save);
router.delete('/',DeleteByChapter);


module.exports = router;