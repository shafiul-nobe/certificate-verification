// imports
const express = require('express');
const createErrors = require('http-errors');
const userService = require('../services/user.service');
const { User } = require('../models/user.model');
const { isValidObjectId, trimAllObjValue } = require('../utils');
const { create } = require('domain');
const { Readable } = require('stream');

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');



const uploadFile = async(req, res, next) => {
    try {

        const file = req.files;
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const data = new FormData();
        data.append("file", file.certificate.data, { filepath: file.certificate.name });
        const result = await axios.post(url, data, {
            maxContentLength: -1,
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: '993684ab30cfcf66e942',//process.env.PINATA_API_KEY,
                pinata_secret_api_key: '4fcbcdfcbfb2f58d03f57d166414f93793b4179eb92ed128c709452cb88e7ffa',//process.env.PINATA_API_SECRET,
                path: "somename",
            },
        });
        res.status(201).send({
            filePath: `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`
        });

    } catch (error) {
        next(error);
    }
}

 // exports
 module.exports = {
    uploadFile
 }