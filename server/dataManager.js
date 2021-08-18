// read functions
// write function
const routes = require("./routes");

var fs = require("fs");

function getUsers(cb) {
  fs.readFile(
    require("path").resolve(__dirname, "./data/users.json"),
    "utf8",
    function (err, data) {
      if (data) {
        const parsedData = JSON.parse(data);
        cb(parsedData, null);
      } else {
        cb(null, err);
      }
    }
  );
}

function getPhotos(cb) {
  try {
    fs.readFile(
      require("path").resolve(__dirname, "./data/photos.json"),
      "utf8",
      function (err, data) {
        if (data) {
          const parsedData = JSON.parse(data);
          cb(parsedData, null);
        } else {
          cb(null, err);
        }
      }
    );
  } catch (error) {
  }
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

function deletePost(photos, cb) {
  debugger;
  //to convert json file to string
  const jsonString = JSON.stringify(photos);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));
  fs.writeFile(
    require("path").resolve(__dirname, "./data/photos.json"),
    data,
    (err) => {
      cb(err);
    }
  );
}

function updateUserData(users, cb) {
  //to convert json file to string
  const jsonString = JSON.stringify(users);
  // to convert the string data to binary and save it in memory
  const data = new Uint8Array(Buffer.from(jsonString));

  fs.writeFile(
    require("path").resolve(__dirname, "./data/users.json"),
    data,
    (err) => {
      cb(err);
    }
  );
}

module.exports = {
  getUsers,
  getPhotos,
  saveNewUser,
  postNewComment,
  postReaction,
  postNewPost,
  deletePost,
  updateUserData,
};
