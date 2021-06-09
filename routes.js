var users = require("./data");

const routes = function (app) {

    // check user route
    app.post('/login', function (request, response) {
        debugger;
        user = users.find(user => (request.body.email === user.email && request.body.password === user.password))
        if (user) {
            response.sendStatus(200)
        } else {
            response.sendStatus(400)
        }

    });


}

module.exports = routes;
