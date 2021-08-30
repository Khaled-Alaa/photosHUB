const dataLayer = require("./dataManager");

function checkExisitingUser(email, password, cb) {
  dataLayer.getUsers(function (users, error) {
    if (users) {
      const user = users.find(
        (user) => email === user.email && password === user.password
      );
      cb(user, null);
    } else {
      cb(null, error);
    }
  });
}

function getUserById(userId, cb) {
  dataLayer.getUsers(function (users, error) {
    if (users) {
      const user = users.find((user) => (user.id == userId ? user : null));
      cb(user, null);
    } else {
      cb(null, error);
    }
  });
}

function getUserByEmail(email, cb) {
  dataLayer.getUsers(function (users, error) {
    if (users) {
      const user = users.find((user) => (user.email == email ? user : null));
      cb(user, null);
    } else {
      cb(null, error);
    }
  });
}

function getAllPhotos(hostName, cb) {
  dataLayer.getPhotos(function (photos, photoErr) {
    dataLayer.getUsers(function (users, userErr) {
      if (photos && users) {
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
            URL: hostName + photo.URL,
            // comments are array of objects of authorComment and user comment
            comments,
          };
        });
        cb(tempPhotosArr, null);
      } else {
        cb(null, photoErr || userErr);
      }
    });
  });
}

function getUserPhotos(hostName, userId, cb) {
  dataLayer.getPhotos(function (photos, photoErr) {
    dataLayer.getUsers(function (users, userErr) {
      if (photos && users) {
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
              URL: hostName + photo.URL,
              // comments are array of objects of authorComment and user comment
              comments,
            });
          }
        });
        cb(tempPhotosArr, null);
      } else {
        cb(null, photoErr || userErr);
      }
    });
  });
}

function saveNewUser(name, email, birthdate, password, cb) {
  dataLayer.getUsers(function (users, error) {
    if (users) {
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
          profilePicture: null,
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
    } else {
      cb(null, error);
    }
  });
}

function postNewComment(imageId, commentAuhtorId, comment, cb) {
  dataLayer.getPhotos(function (photos, error) {
    if (photos) {
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
        //to add new comment to the json file
        photos[photoIndex].comments.push(newComment);
        dataLayer.postNewComment(photos, function (err) {
          if (err) {
            cb(null, err);
          } else {
            cb("succes", null);
          }
        });
      }
    } else {
      cb(null, error);
    }
  });
}

function postReaction(reaction, reactUser, reactPhoto, cb) {
  dataLayer.getPhotos(function (photos, error) {
    if (photos) {
      photo = photos.find((photo) =>
        photo.id == reactPhoto.id ? photo : null
      );
      // ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
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
              cb(null, err);
            } else {
              cb("succes", null);
            }
          });
        } else {
          photos[photoIndex].reactions[reactionIndex].type = reaction;
          dataLayer.postReaction(photos, function (err) {
            if (err) {
              cb(null, err);
            } else {
              cb("succes", null);
            }
          });
        }
      } else {
        photos[photoIndex].reactions.splice(reactionIndex, 1);
        dataLayer.postReaction(photos, function (err) {
          if (err) {
            cb(null, err);
          } else {
            cb("succes", null);
          }
        });
      }
    } else {
      cb(null, error);
    }
  });
}
//
function formatDate(date) {
  var todaydate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  var time = date.getHours() + ":" + date.getMinutes();

  // return [todaydate, time].join("|");
  return todaydate + " " + "(" + timeConvert(time) + ")";
}
//
function timeConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
//
function postNewPost(postAuthorId, postDescription, photoName, cb) {
  dataLayer.getPhotos(function (photos, error) {
    if (photos) {
      const newPost = {
        id: Math.floor(Math.random() * 100000000000000),
        authorId: postAuthorId,
        URL: `/uploads/${photoName}`,
        description: postDescription == "undefined" ? "" : postDescription,
        comments: [],
        reactions: [],
        date: formatDate(new Date()),
      };
      /////////////
      //to add new post to the json file
      photos.push(newPost);
      dataLayer.postNewPost(photos, function (err) {
        if (err) {
          cb(null, err);
        } else {
          cb("succes", null);
        }
      });
    } else {
      cb(null, error);
    }
  });
}

function deletePost(photoId, cb) {
  const x = photoId;
  dataLayer.getPhotos(function (photos, error) {
    if (photos) {
      newPhotos = photos.filter(function (photo) {
        return photo.id != photoId;
      });
      /////////////
      //to update the json file with the new photos without the deleted photo
      dataLayer.deletePost(newPhotos, function (err) {
        if (err) {
          cb(null, err);
        } else {
          cb("succes", null);
        }
      });
    } else {
      cb(null, error);
    }
  });
}

function updateUserData(
  hostName,
  userId,
  userName,
  oldPass,
  newPass,
  newProfilePictureName,
  cb
) {
  dataLayer.getUsers(function (users, error) {
    debugger;
    if (users) {
      const user = users.find((user) => (user.id == userId ? user : null));
      const userIndex = users.findIndex((user) =>
        user.id == userId ? user : null
      );
      if (newProfilePictureName) {
        user.profilePicture = `${hostName}/uploads/${newProfilePictureName}`;
        user.date = formatDate(new Date());
      }
      if (userName) {
        user.name = userName;
      }
      if (oldPass === user.password && newPass) {
        user.password = newPass;
      }

      users[userIndex] = user;
      dataLayer.updateUserData(users, function (err) {
        if (err) {
          cb(null, err);
        } else {
          cb(user, null);
        }
      });
    } else {
      cb(null, error);
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
  postNewPost,
  deletePost,
  updateUserData,
};
