const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { Characters, save, DeleteBySeason, findAll, savePersonajes } = require('./../controllers/temporada');

const router = Router();

router.get('/Characters', Characters);
router.get('/',findAll);
router.post('/', save);
router.post('/Personajes',savePersonajes);
router.delete('/:id',DeleteBySeason);


module.exports = router;