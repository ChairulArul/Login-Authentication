
const express = require('express');
const routes = express.Router();
const usersController = require('../../controllers/users');
const authenticateToken = require('../../middleware/auth');

routes.get('/', usersController.users)
routes.get('/:id', authenticateToken, usersController.userDetailByID)

module.exports = routes;