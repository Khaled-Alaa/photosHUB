/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const routes = require("./routes");


/* Initialize the main project folder*/
app.use(express.static('src'));

const port = 5000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

routes(app)