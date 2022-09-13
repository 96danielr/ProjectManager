const { User } = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await User.create({ name, email, password });

        // 201 -> Success and a resource has been created
        res.status(201).json({
            status: 'success',
            data: { newUser },
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            status: 'Active',
            data: { users },
        });
    } catch (error) {}
};

const updateUsers = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { id } = req.params;

        //checking if the regist exists
        const registration = await User.findOne({ where: { id } });

        if (!registration) {
            return res.status(404).json({
                status: 'erroor',
                message: 'user not found',
            });
        }

        await registration.update({ name, email });

        res.status(200).json({
            status: 'succes',
            data: { users },
        });
    } catch (error) {
        console.log('error');
    }
};

const deleteUser = async (req, res) => {
	try {
		const { user } = req;

	
		await user.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
    createUser,
    getAllUsers,
    updateUsers,
    deleteUser
};
