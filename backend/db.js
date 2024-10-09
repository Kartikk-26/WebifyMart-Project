const mongoose = require('mongoose');
const colors = require('colors')
require('dotenv').config()

const dbConnect = async() => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(colors.blue('Connection Successfull'))
  } catch (error) {
    console.log(colors.red(error))
  }
};

module.exports = dbConnect ;
