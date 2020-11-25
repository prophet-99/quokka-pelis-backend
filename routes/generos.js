const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, deleteGender } = require('./../controllers/generos');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('descripcion','La descripcion es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:id', deleteGender);

module.exports = router;