const e = require("cors");
var fs = require("fs");
const businsesLayer = require("./businesLogic");

const routes = function (app) {
  // check exisiting user
  app.post("/login", function (request, response) {
    businsesLayer.checkExisitingUser(
      request.body.email,
      request.body.password,
      function (user) {
        if (user) {
          response.status(200).send(user);
        } else {
          response.sendStatus(400);
        }
      }
    );
  });

  // create new user
  app.post("/signup", function (request, response) {
    businsesLayer.saveNewUser(
      request.body.name,
      request.body.email,
      request.body.birthdate,
      request.body.password,
      function (user, err) {
        if (err) {
          if (err.error.code === 1) {
            response.status(409).send({
              error: {
                code: 100,
                message: "email_exist",
              },
            });
          } else if (err.error.code === 2) {
            response.status(380).send({
              error: {
                code: 10,
                message: "couldn't write in file :(",
              },
            });
          }
        } else {
          response.status(200).send({
            user,
          });
        }
      }
    );
  });

  // get photos of user
  app.get("/users/:userId/photos", function (request, response) {
    fs.readFile("./data/photos.json", "utf8", function (err1, photosData) {
      fs.readFile("./data/users.json", "utf8", function (err, usersData) {
        const parsedPhotos = JSON.parse(photosData);
        const parsedUsers = JSON.parse(usersData);

        const tempPhotosArr = [];
        parsedPhotos.forEach((photo) => {
          if (photo.authorId == request.params.userId) {
            const author = parsedUsers.find(
              (user) => user.id == photo.authorId
            );

            const comments = photo.comments.map((userComment) => {
              const authorComment = parsedUsers.find(
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

        if (tempPhotosArr) {
          response.status(200).send(tempPhotosArr);
        } else {
          response.sendStatus(400);
        }
      });
    });
  });

  // get photos
  app.get("/photos", function (request, response) {
    businsesLayer.getAllPhotos(function (tempPhotosArr) {
      response.status(200).send(tempPhotosArr);
    });
  });

  // get signed user
  app.get("/users/:userId", function (request, response) {
    businsesLayer.getUserById(request.params.userId, function (user) {
      if (user) {
        response.status(200).send(user);
      } else {
        response.sendStatus(400);
      }
    });
  });

  // post comment
  app.post("/photos/comment", function (request, response) {
    businsesLayer.postNewComment(
      request.body.imageId,
      request.body.commentAuhtorId,
      request.body.comment,
      function (err) {
        debugger;
        if (err) {
          response.status(380).send({
            error: {
              code: 10,
              message: "couldn't write in file :(",
              error: err,
            },
          });
        } else {
          response.status(200).send({
            error: {
              code: 200,
              message: "The file has been saved :)",
            },
          });
        }
      }
    );
    /////////////////////////
    // fs.readFile("./data/photos.json", "utf8", function (err, data) {
    //   if (err) throw err;
    //   const parsedData = JSON.parse(data);
    //   photo = parsedData.find((photo) =>
    //     photo.id == request.body.imageId ? photo : null
    //   );

    //   photoIndex = parsedData.findIndex((photo) =>
    //     photo.id == request.body.imageId ? photo : null
    //   );
    //   if (photo) {
    //     const newComment = {
    //       userId: request.body.commentAuhtorId,
    //       comment: request.body.comment,
    //     };

    //     //to add new cooment to the json file
    //     const addedComment = parsedData[photoIndex].comments.push(newComment);
    //     //to convert json file to string
    //     const jsonString = JSON.stringify(parsedData);
    //     // to convert the string data to binary and save it in memory
    //     const data = new Uint8Array(Buffer.from(jsonString));
    //     fs.writeFile("./data/photos.json", data, (err) => {
    //       if (err) {
    //         response.status(380).send({
    //           error: {
    //             code: 10,
    //             message: "couldn't write in file :(",
    //           },
    //         });
    //       } else {
    //         response.status(200).send({
    //           error: {
    //             code: 200,
    //             message: "The file has been saved :)",
    //           },
    //         });
    //       }
    //     });
    //   }
    // });
  });
};

module.exports = routes;
