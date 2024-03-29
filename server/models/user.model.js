// imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

// shcema definition
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    }
  });

  const User = mongoose.model('User', userSchema);
  
  // exports
  module.exports = {
      User
    };