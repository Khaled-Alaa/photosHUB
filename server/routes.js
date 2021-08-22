const e = require("cors");
var fs = require("fs");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// var upload = multer({ storage: storage }).single("postPhoto");
var upload = multer({ storage: storage });

const businsesLayer = require("./businesLogic");

const routes = function (app) {
  // check exisiting user
  app.post("/login", function (request, response) {
    businsesLayer.checkExisitingUser(
      request.body.email,
      request.body.password,
      function (user, error) {
        if (user) {
          response.status(200).send(user);
        } else {
          response.status(500).send(error);
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
    const domainProtocol = request.secure ? "https://" : "http://";
    const domainName = `${domainProtocol}${request.headers.host}`;
    businsesLayer.getUserPhotos(
      domainName,
      request.params.userId,
      function (photos, error) {
        if (photos) {
          response.status(200).send(photos);
        } else {
          response.status(500).send(error);
        }
      }
    );
  });

  // get photos
  app.get("/photos", function (request, response) {
    const domainProtocol = request.secure ? "https://" : "http://";
    const domainName = `${domainProtocol}${request.headers.host}`;
    businsesLayer.getAllPhotos(domainName, function (tempPhotosArr, error) {
      if (tempPhotosArr) {
        response.status(200).send(tempPhotosArr);
      } else {
        response.status(500).send(error);
      }
    });
  });

  // get signed user
  app.get("/users/:userId", function (request, response) {
    businsesLayer.getUserById(request.params.userId, function (user, error) {
      if (user) {
        response.status(200).send(user);
      } else {
        response.status(500).send(error);
      }
    });
  });

  // post comment
  app.post("/photos/comment", function (request, response) {
    businsesLayer.postNewComment(
      request.body.imageId,
      request.body.commentAuhtorId,
      request.body.comment,
      function (succes, err) {
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
            succes: {
              code: 200,
              message: "The file has been saved :)",
              succes: succes,
            },
          });
        }
      }
    );
  });

  // post Reaction
  app.post("/photos/reaction", function (request, response) {
    businsesLayer.postReaction(
      request.body.type,
      request.body.user,
      request.body.photo,
      function (succes, err) {
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
            succes: {
              code: 200,
              message: "The file has been saved :)",
              succes: succes,
            },
          });
        }
      }
    );
  });

  // post Post
  app.post(
    "/photos/newPost",
    upload.single("postPhoto"),
    function (request, response) {
      businsesLayer.postNewPost(
        request.body.autherId,
        request.body.description,
        request.file.filename,
        function (succes, err) {
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
              succes: {
                code: 200,
                message: "The file has been saved :)",
                succes: succes,
              },
            });
          }
        }
      );
    }
  );

  // DELETE Post
  app.delete("/photos", function (request, response) {
    businsesLayer.deletePost(request.body.photoId, function (succes, err) {
      if (err) {
        response.status(380).send({
          error: {
            code: 10,
            message: "couldn't delete the post :(",
            error: err,
          },
        });
      } else {
        response.status(200).send({
          succes: {
            code: 200,
            message: "The post has been deleted :)",
            succes: succes,
          },
        });
      }
    });
  });

  // Edit User Data
  app.post(
    "/user",
    upload.single("newProfilePicture"),
    function (request, response) {
      const domainProtocol = request.secure ? "https://" : "http://";
      const domainName = `${domainProtocol}${request.headers.host}`;
      businsesLayer.updateUserData(
        domainName,
        request.body.userId,
        request.body.name,
        request.body.birthdate,
        request.body.password,
        request.body.newProfilePictureName,
        function (user, err) {
          if (err) {
            response.status(380).send({
              error: {
                code: 10,
                message: "couldn't update you data :(",
                error: err,
              },
            });
          } else {
            response.status(200).send(user);
          }
        }
      );
    }
  );
};

module.exports = routes;
