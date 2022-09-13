const { Tasks } = require('../models/tasks.model');

const taskExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Tasks.findOne({ where: { id } });

        if (!task) {
            res.status(404).json({
                status: 'error',
                message: 'task no found',
            });
        }

        req.task = task;
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    taskExists,
};
