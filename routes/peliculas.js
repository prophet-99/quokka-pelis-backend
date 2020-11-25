
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check-fields');
const { findAll, NumMoviesForGender, ReleaseYear, Directors, Actors, Characters, save, DeleteByMovie, Estrenos } = require('./../controllers/peliculas');
const upload = require('./../middlewares/images');

const router = Router();

router.get('/', findAll);
router.get('/NumMovies', NumMoviesForGender);
router.get('/Year', ReleaseYear);
router.get('/Estrenos', Estrenos);
router.get('/Directors', Directors);
router.get('/Actors', Actors);
router.get('/Character', Characters);
router.post('/', upload.single('image'), save);
router.delete('/',DeleteByMovie);


module.exports = router;