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
router.post('/', upload.single('image'), save);
router.delete('/:id',DeleteBySerie);


module.exports = router;