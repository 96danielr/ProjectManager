const express = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const {
    createUser,
    getAllUsers,
    updateUsers,
    deleteUser,
} = require('../controllers/users.controller');

//Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
    createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:id', userExists, updateUsers);
usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
