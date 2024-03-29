// imports
const express = require('express');
const createErrors = require('http-errors');
const userService = require('../services/user.service');
const { User } = require('../models/user.model');
const { isValidObjectId, trimAllObjValue } = require('../utils');
const { create } = require('domain');

const createUser = async(req, res, next) => {
    try {
        
        trimAllObjValue(req.body);
        let userBody = req.body;

        const savedUser = await userService.createUser(userBody)
        res.status(201).send(savedUser);

    } catch (error) {
        next(error);
    }
}

const getUsers = async(req, res, next) => {
    try {

        const name = req.query.name;
        const roll = req.query.roll;

        let searchParams = {};

        if( name ) {
            searchParams.name = { $regex: name, $options: "i" };
        }

        if( roll ) {
            searchParams.roll = { $regex: roll, $options: "i" };
        }

        let selectFields = 'name roll _id';

        let users = await userService.readUser(searchParams, selectFields);

        res.send(users);

    } catch (error) {
        next(error);
    }
}

const editUser = async(req, res, next) => {
    try {
        
        trimAllObjValue(req.body);
        const userBody = req.body;

        // search with userid
        const searchParams = {_id: userBody.userId };
        const selectFields = ['name'];

        const userExists = await userService.readUsers(searchParams, selectFields);

        if( userExists.length == 0 ) {
            throw createErrors.NotFound("User not found with this id");
        }

        // update user
        const updatedUser = await userService.updateUser(
            userBody.userId, {
            name: userBody.name,
            roll: userBody.roll
        });

        res.send(updatedUser);

    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try {
        
        const userId = req.params.userId;

        if( !isValidObjectId(userId) ) {
            throw createErrors.BadRequest("Invalid user id");
        }

        // search with userid
        const searchParams = {_id: userId };
        const selectFields = ['name'];

        const userExists = await userService.readUsers(searchParams, selectFields);

        if( userExists.length == 0 ) {
            throw createErrors.NotFound("User not found with this id");
        }

        // delete user
        deleteParams = { _id: userId }
        const deleteStatus = await userService.deleteUser(deleteParams);

        if( deleteStatus.deletedCount == 1 ) {
            res.send({
                msg: `User deleted with id ${userId}`
            });
        } else {
            throw createErrors.InternalServerError(`Couldn't delete, try again`);
        }


    } catch (error) {
        next(error);
    }
}

 // exports
 module.exports = {
    createUser,
    getUsers,
    editUser,
    deleteUser
 }