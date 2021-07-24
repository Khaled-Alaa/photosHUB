/* Express to run server and routes */
const express = require("express");
const path = require("path");

const routes = require("./routes");

/* Middleware*/
const cors = require("cors");

/* Dependencies */
const bodyParser = require("body-parser");

/* Start up an instance of app */
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Initialize the main project folder*/
// app.use(express.static('src'));

routes(app);

const port = 5000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}
