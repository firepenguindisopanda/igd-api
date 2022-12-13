const express = require('express');
const path = require('path');
const { logger, logEvents } = require('../middleware/logger');
const { errorHandler } = require('../middleware/errorHandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const db = require('../models');
const Role = db.role;
const Blog = db.blogs;


const app = express();
const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initialiseRoles();
    createThreeBlogs();
});

const initialiseRoles = () => {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id: 3,
        name: 'admin'
    });
};

const createThreeBlogs = () => {
    Blog.create({
        title: "TensorFlow and Deep Learning Tutorial",
        description: "A 10 hour youtube video on coding first approach to understanding TensorFlow",
        url: "https://www.youtube.com/watch?v=tpCFfeUEGs8"
    });

    Blog.create({
        title: "React JS CRUD example to consume API",
        description: "A blog post detailing the flow of setting up a frontend to consume an api in react",
        url: "https://www.bezkoder.com/react-crud-web-api/#Setup_Reactjs_Project"
    });

    Blog.create({
        title: "Nodejs api with jwt Authentication and Authorization using refresh token",
        description: "A blog post detailing the flow of setting up a refresh token. This allows us to implement a JWT token that expires and then renew the Access Token with Refresh",
        url: "https://www.bezkoder.com/jwt-refresh-token-node-js/"
    });
}

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Intergalactic Digital API" });
});


// routes for auth and users
require('../routes/auth.routes')(app);
require('../routes/user.routes')(app);

// routes for blog
require('../routes/blog.routes')(app);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});