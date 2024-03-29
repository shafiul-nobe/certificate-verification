// imports
const Joi = require('joi');
const {
    createUserSchema,
    updateUserSchema
 } = require('../validators/user.validator');

// middlewares
const validateUserReq = async (req, res, next) => {
    try {
        await createUserSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

const validateUpdateUserReq = async (req, res, next) => {
    try {
        await updateUserSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

// exports
module.exports = {
    validateUserReq,
    validateUpdateUserReq
}