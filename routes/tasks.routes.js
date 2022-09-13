const express = require('express');
const { taskExists } = require('../middlewares/tasks.middlewares');

const {
    getAllTasks,
    createTask,
    getForStatus,
    updateTasks,
    deleteTasks,
} = require('../controllers/tasks.controller');

//middlewares
const { validatorStatus } = require('../middlewares/validators.middlewares');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', validatorStatus, getForStatus);
tasksRouter.post('/', createTask);
tasksRouter.patch('/:id', taskExists, updateTasks);
tasksRouter.delete('/:id', taskExists, deleteTasks);

module.exports = { tasksRouter };
