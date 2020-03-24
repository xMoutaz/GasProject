// UserMongoDB Model
const mongoose = require('mongoose');

const TranslationMDB = mongoose.model('TranslationMDB',{
     _id: {
          type: String,
          required: true
     },
     word: { }
},'Translations');

module.exports = TranslationMDB;