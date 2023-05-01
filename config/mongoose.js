
const mongoose = require('mongoose');

// mongoose connection
mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;


// for db error

db.on('error',console.error.bind(console,'Error in Connecting Database'));


// on successfull connection
db.once('open',function(){
    console.log('Connected To Database');
});

module.exports = db;
