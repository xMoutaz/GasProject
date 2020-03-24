const mongoose = require('mongoose');

// make sure bodyParser working

async function connect() {
    try {
        await 
        mongoose.connect(
          'mongodb+srv://xMoutaz:moutaz1@cluster0-15tjf.mongodb.net/test', 
          { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DATABASE IS CONNECTED');
      } catch (error) {
        handleError(JSON.stringify(error));
      }

}
connect();

module.exports = mongoose;