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

function getUserPhotos(userId, cb) {
  dataLayer.getPhotos(function (photos) {
    dataLayer.getUsers(function (users) {
      const tempPhotosArr = [];
      photos.forEach((photo) => {
        if (photo.authorId == userId) {
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

          tempPhotosArr.push({
            author: author,
            // authorComment: authorComment,
            ...photo,
            // comments are array of objects of authorComment and user comment
            comments,
          });
        }
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
        if (err) {
          cb(err, null);
        } else {
          cb(null, "succes");
        }
      });
    }
  });
}

function postReaction(reaction, reactUser, reactPhoto, cb) {
  dataLayer.getPhotos(function (photos) {
    photo = photos.find((photo) => (photo.id == reactPhoto.id ? photo : null));
    photoIndex = photos.findIndex((photo) =>
      photo.id == reactPhoto.id ? photo : null
    );
    reactionIndex = photo.reactions.findIndex((react) =>
      react.userId == reactUser.id ? react : null
    );
    existReaction = photo.reactions.find((react) =>
      react.userId == reactUser.id ? react : null
    );
    if (reaction != "remove") {
      if (!existReaction) {
        const newReaction = {
          type: reaction,
          userId: reactUser.id,
          name: reactUser.name,
        };
        photos[photoIndex].reactions.push(newReaction);
        dataLayer.postReaction(photos, function (err) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, "succes");
          }
        });
      } else {
        const newReaction = {
          type: reaction,
          userId: reactUser.id,
          name: reactUser.name,
        };
        photos[photoIndex].reactions[reactionIndex].type = reaction;
        dataLayer.postReaction(photos, function (err) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, "succes");
          }
        });
      }
    } else {
      photos[photoIndex].reactions.splice(reactionIndex, 1);
      dataLayer.postReaction(photos, function (err) {
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
  getUserPhotos,
  saveNewUser,
  postNewComment,
  postReaction,
};
