const { Tasks } = require('../models/tasks.model');
const { User } = require('../models/user.model');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.findAll({ include: [User] });
        res.status(200).json({
            status: 'Active',
            data: { tasks },
        });
    } catch (error) {}
};

const createTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body;

        const newTask = await Tasks.create({
            title,
            userId,
            startDate,
            limitDate,
        });

        // 201 -> Success and a resource has been created
        res.status(201).json({
            status: 'success',
            data: { newTask },
        });
    } catch (error) {
        console.log(error);
    }
};

const getForStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const tasks = await Tasks.findAll({
            where: { status },
        });

        res.status(200).json({
            status: 'success',
            data: {
                tasks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateTasks = async (req, res) => {
    try {
        const { task } = req;

        const { finishDate } = req.body;

        finishDateD = new Date(finishDate);

        if (task.status === 'active') {
            if (finishDateD < task.limitDate)
                await task.update({ finishDate, status: 'completed' });
            else await task.update({ finishDate, status: 'late' });

            res.status(200).json({
                status: 'success',
                data: {
                    task,
                },
            });
        }

        res.status(404).json({
            status: 'error',
            message: 'taks no active',
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTasks = async (req, res) => {
    try {
        const { task } = req;

        await task.update({ status: 'cancelled' });

        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getAllTasks,
    createTask,
    getForStatus,
    updateTasks,
    deleteTasks,
};
