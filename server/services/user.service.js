// imports
const express = require('express');
const createErrors = require('http-errors');
const { User } = require('../models/user.model');

// CRUD
 const createUser = async(userBody) => {
    try {

        const newUser = new User(userBody);
        let savedUser = await newUser.save();

        return Promise.resolve(savedUser);

    } catch (error) {
        return Promise.reject(error);
    }
}


const readUser = async(
    searchParams,
    selectFields) => {
    try {

        const users = await User
        .find(searchParams)
        .select(selectFields);

        return Promise.resolve(users);

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUser = async(
    userId,
    fields) => {
    try {

        const users = await User
        .findByIdAndUpdate(userId, fields, {new: true});

        return Promise.resolve(users);

    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteUser = async(deleteParams) => {
    try {

        const user = await User.deleteOne(deleteParams);

        return Promise.resolve(user);

    } catch (error) {
        return Promise.reject(error);
    }
}


// exports
module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}