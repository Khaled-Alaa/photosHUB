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
    businsesLayer.getUserPhotos(request.params.userId, function (photos) {
      if (photos) {
        response.status(200).send(photos);
      } else {
        response.sendStatus(400);
      }
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
  });
};

module.exports = routes;
