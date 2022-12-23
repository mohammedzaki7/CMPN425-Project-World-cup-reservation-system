const connectDB = require('./connection.js');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

const PORT = 3000;
const baseRoute = '../routes/'
var host, port;


connectDB();


const server = app.listen(PORT, () => {
    host = server.address().address;
    port = server.address().port; 
    console.log('listening at http://localhost:%s', port);
});

app.set('view engine', 'ejs'); // set up ejs for templating TOBE REMOVED

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.use('/', require(baseRoute + 'customer.js'));


