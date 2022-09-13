const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg);

        const message = errorMessages.join('. ');

        return res.status(400).json({
            status: 'error',
            message,
        });
    }

    next();
};

const createUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    checkValidations,
];

const validatorStatus = (req, res, next) => {
    const { status } = req.params;

    const string = status.toLowerCase();
    const valueStatus = ['active', 'completed', 'late', 'cancelled'];
    if (valueStatus.includes(string)) return next();

    return res.status(400).json({
        status: 'error',
        message: 'wrong text entered',
    });
};

module.exports = { createUserValidators, validatorStatus };
