const connectDB = require('./connection.js');
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

var host, port;


connectDB();


const server = app.listen(PORT, () => {
    host = server.address().address;
    port = server.address().port; 
    console.log('listening at http://localhost:%s', port);
});



