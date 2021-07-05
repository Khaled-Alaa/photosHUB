const dataLayer = require("./dataManager");

function checkExisitingUser(email, password, cb) {
  dataLayer.getUsers(function (users) {
    const user = users.find(
      (user) => email === user.email && password === user.password
    );
    cb(user);
  });
}

function getUserById(userId, cb) {
  dataLayer.getUsers(function (users) {
    const user = users.find((user) => (user.id == userId ? user : null));
    cb(user);
  });
}

function getUserByEmail(email, cb) {
  dataLayer.getUsers(function (users) {
    const user = users.find((user) => (user.email == email ? user : null));
    cb(user);
  });
}

function getAllPhotos(cb) {
  dataLayer.getPhotos(function (photos) {
    dataLayer.getUsers(function (users) {
      const tempPhotosArr = photos.map((photo) => {
        const author = users.find((user) => user.id == photo.authorId);
        const comments = photo.comments.map((userComment) => {
          const authorComment = users.find(
            (user) => user.id == userComment.userId
          );
          return {
            authorComment,
            ...userComment,
          };
        });

        return {
          author: author,
          // authorComment: authorComment,
          ...photo,
          // comments are array of objects of authorComment and user comment
          comments,
        };
      });

      cb(tempPhotosArr);
    });
  });
}

function saveNewUser(name, email, birthdate, password, cb) {
  dataLayer.getUsers(function (users) {
    const user = users.find((user) => email === user.email);
    if (user) {
      cb(null, { error: { code: 1, error: new Error("already_exist") } });
    } else {
      const newUser = {
        id: Math.floor(Math.random() * 100000),
        name: name,
        email: email,
        birthdate: birthdate,
        password: password,
      };
      //to add new user to the json file
      users.push(newUser);
      dataLayer.saveNewUser(users, function (err) {
        if (err) {
          cb(null, { err: { code: 2, error: err } });
        } else {
          getUserByEmail(email, function (user) {
            cb(user, null);
          });
        }
      });
    }
  });
}

function postNewComment(imageId, commentAuhtorId, comment, cb) {
  dataLayer.getPhotos(function (photos) {
    photo = photos.find((photo) => (photo.id == imageId ? photo : null));
    photoIndex = photos.findIndex((photo) =>
      photo.id == imageId ? photo : null
    );
    if (photo) {
      const newComment = {
        userId: commentAuhtorId,
        comment: comment,
      };
      /////////////
      //to add new cooment to the json file
      photos[photoIndex].comments.push(newComment);
      dataLayer.postNewComment(photos, function (err) {
        debugger;
        if (err) {
          cb(err, null);
        } else {
          cb(null, "succes");
        }
      });
    }
  });
}

module.exports = {
  checkExisitingUser,
  getUserById,
  getAllPhotos,
  saveNewUser,
  postNewComment,
};
