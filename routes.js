var fs = require("fs");

const routes = function (app) {
  // check user route
  app.post("/login", function (request, response) {
    fs.readFile("data.json", "utf8", function (err, data) {
      if (err) throw err;
      const parsedData = JSON.parse(data);
      user = parsedData.users.find(
        (user) =>
          request.body.email === user.email &&
          request.body.password === user.password
      );
      if (user) {
        response.status(200).send(user);
      } else {
        response.sendStatus(400);
      }
    });
  });

  // create new user
  app.post("/signup", function (request, response) {
    fs.readFile("data.json", "utf8", function (err, data) {
      if (err) throw err;
      const parsedData = JSON.parse(data);

      user = parsedData.users.find((user) => request.body.email === user.email);
      if (user) {
        response.status(409).send({
          error: {
            code: 100,
            message: "email_exist",
          },
        });
      } else {
        const newUser = {
          id: Math.floor(Math.random() * 100000),
          name: request.body.name,
          email: request.body.email,
          birthdate: request.body.birthdate,
          password: request.body.password,
        };
        //to add new user to the json file
        parsedData.users.push(newUser);
        //to convert json file to string
        const jsonString = JSON.stringify(parsedData);
        // to convert the string data to binary and save it in memory
        const data = new Uint8Array(Buffer.from(jsonString));

        fs.writeFile("./data.json", data, (err) => {
          if (err) {
            response.status(380).send({
              error: {
                code: 10,
                message: "couldn't write in file :(",
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
        });
        //response.send(newUser);
      }
    });
  });

  // get photo for card
  app.get("/photos/:userId", function (request, response) {
    fs.readFile("data.json", "utf8", function (err, data) {
      if (err) throw err;
      const parsedData = JSON.parse(data);
      photo = parsedData.photos.find((photo) =>
        photo.userId == request.params.userId ? photo : null
      );
      if (photo) {
        response.status(200).send(photo);
      } else {
        response.sendStatus(400);
      }
    });
  });

  // get signed user
  app.get("/users/:userId", function (request, response) {
    fs.readFile("data.json", "utf8", function (err, data) {
      debugger;
      if (err) throw err;
      debugger;
      const parsedData = JSON.parse(data);
      user = parsedData.users.find((user) =>
        user.id == request.params.userId ? user : null
      );
      if (user) {
        response.status(200).send(user);
      } else {
        response.sendStatus(400);
      }
    });
  });
};

module.exports = routes;
