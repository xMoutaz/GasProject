// UserMongoDB Model
const mongoose = require('mongoose');

const UserMDB = mongoose.model('UserMDB',{
     _id: {
          type: String,
          required: true
     },
     name: {
          type: String,
          required: true
          },
     email: {
          type: String,
          required: true
          },
     phone: {
          type: String,
          required: true
          },
     isAdmin: {
          type: Boolean,
          default: false
          }
});

module.exports = UserMDB;