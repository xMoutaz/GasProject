// UserMongoDB Model
const mongoose = require('mongoose');

const AddressMDB = mongoose.model('AddressMDB',{
     _id: {
          type: String,
          required: true
     },
     zip: {
          type: String,
          required: true
          },
    addressLine1: {
          type: String,
          required: true
          },
    addressLine2: {
          type: String,
          required: true
          },
    longitude: {
          type: String,
          required: true
          },
    latitude: {
          type: String,
          required: true
          }
},'Addresses');

module.exports = AddressMDB;