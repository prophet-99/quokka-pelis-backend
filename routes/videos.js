const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, save, deleteVideo } = require('./../controllers/videos');

const router = Router();

router.get('/', findAll);
router.post('/', [
    check('url_video','La url del video es obligatorio').notEmpty(),
    check('valoracion','La valoracion es obligatorio').notEmpty(),
    check('duracion','La duracion es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/', deleteVideo);

module.exports = router;