/**
 * ROUTE: /usuario
 */
const { Router } = require('express');
const { findAll, searchByRol } = require('./../controllers/usuarios');
const router = Router();

router.get('/', findAll);

router.get('/:userRol', searchByRol);

module.exports = router;