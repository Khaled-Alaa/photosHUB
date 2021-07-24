// read functions
// write function
const routes = require("./routes");

var fs = require("fs");

function getUsers(cb) {
  fs.readFile("./data/users.json", "utf8", function (err, data) {
    if (err) response.send(err);
    const parsedData = JSON.parse(data);

    cb(parsedData);
  });
}

function getPhotos(cb) {
  fs.readFile("./data/photos.json", "utf8", function (err, data) {
    if (err) response.send(err);
    const parsedData = JSON.parse(data);
    cb(parsedData);
  });
}

function saveNewUser(users, cb) {
  //to convert json file to string
  const jsonString = JSON.stringify(users);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));

  fs.writeFile("./data/users.json", data, (err) => {
    cb(err);
  });
}

function postNewComment(photos, cb) {
  //to convert json file to string
  const jsonString = JSON.stringify(photos);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));
  fs.writeFile("./data/photos.json", data, (err) => {
    cb(err);
  });
}

function postReaction(photos, cb) {
  //to convert json file to string
  const jsonString = JSON.stringify(photos);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));
  fs.writeFile("./data/photos.json", data, (err) => {
    cb(err);
  });
}

function postNewPost(photos, cb) {
  //to convert json file to string
  const jsonString = JSON.stringify(photos);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));
  fs.writeFile("./data/photos.json", data, (err) => {
    cb(err);
  });
}
module.exports = {
  getUsers,
  getPhotos,
  saveNewUser,
  postNewComment,
  postReaction,
  postNewPost,
};
