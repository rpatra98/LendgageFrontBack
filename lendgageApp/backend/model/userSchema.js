const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

})

const User = mongoose.model('USER', userSchema);

module.exports = User;