const { error } = require('console');
const mongoose = require('mongoose');

// mongoose connection
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);


const db = mongoose.connection;


// for db error

db.on('error',console.error.bind(console,'Error in Connecting Database'));


// on successfull connection
db.once('open',function(){
    console.log('Connected To Database');
});

module.exports = db;
