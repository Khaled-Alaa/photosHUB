# PhotosHUB Project

This is PhotosHUB project for practicing for Node.js and React.
The project is about photos you can upload photo and leave comment ant reactions, you will find your posts in profile page and all posts in home page.

Firstly you need to launch server side To get started developing:

- install all project dependencies with `npm install`
- start the development server with `npm start`

To get started developing for client:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── client
│   ├── node_modules # Node packages
│   ├── public
│   │   ├── assets.
│   │   │   └── images # Images of site logo
│   │   ├── favicon.ico # React Icon, You may change if you wish.
│   │   ├── index.html # DO NOT MODIFY
│   ├── src
│   │   ├── components
│   │   │   ├── AddPost # Component render add post which able you to post a post.
│   │   │   ├── Card # Component render card to use it in many components in photosHUB.
│   │   │   └── Header # Component render the header of the site.
│   │   ├── helpers
│   │   │   └── requester # Function able me to make API requests.
│   │   ├── layout
│   │   │   └── PrivateLayout # Component render in it the components realted by the logged user.
│   │   ├── pages
│   │   │   ├── HomePage # Page where you find your posts and your friends' posts and add post component.
│   │   │   ├── LoginPage # Page where you find login form to can access the photoHUB site.
│   │   │   ├── ProfilePage # Page where you find your posts only.
│   │   │   └── SignupPage # Page where you find sign up form to make an account in the photoHUB site.
│   │   └── index.js # Entry point of fornt end
│   ├── .prettierrc # prettier configuratin file (prettier formater)
│   └── package.json # npm package manager file. It's unlikely that you'll need to modify this.
│
├── server
│   ├── data # Folder contains json files of the data of the the site.
│   ├── node_modules # Node packages
│   ├── uploads # Contains images that upload bu users.
│   ├── businesLogic.js # Contains functions of the logic 
│   ├── dataManager.js # Contains functions that dealing with database (json files) 
│   ├── errors.js # Contains object of errors  
│   ├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
│   ├── routes.js # Contains routes
│   └── server.js # Entry point of server
│
└── README.md # This file
```
## Missing Feature
delete post
add profile picture for users
forget password page 


## demo link
 http://photos-hub-front-end.herokuapp.com/
