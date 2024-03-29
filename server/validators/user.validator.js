// imports
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

// defining user validation schemas
const createUserSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    roll: Joi.string()
        .min(3)
        .max(30)
        .required()

});

const updateUserSchema = Joi.object({
    userId: Joi.objectId()
        .required(),

    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required(),

    roll: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()

});

// exports
module.exports = {
    createUserSchema,
    updateUserSchema
};