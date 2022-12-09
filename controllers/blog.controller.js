const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;

// controller method to create and save a new blog to the postgresql database
exports.create = (req, res) => {
    // check if the request body has title
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
    }

    // check if the request body has description
    if (!req.body.description) {
        res.status(400).send({
            message: "Description can not be empty!"
        });
    }
    // check if the request body has url
    if (!req.body.url) {
        res.status(400).send({
            message: "URL can not be empty!"
        });
    }

    // create a blog object
    const blog = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        published: req.body.published ? req.body.published : false
    };

    Blog.create(blog).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Blog."
        });
    });
};

/**
 * controller method to retrieve all blogs from the database
 * Retrieve all blogs by a specific title
 */
exports.findAll = (req, res) => {
    const title = req.body.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Blog.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blogs."
        });
    });
};


/**
 * controller method to find a single blog with an id
 */
exports.findOne = (req, res) => {};

/**
 * controller method to update a blog by the id in the request
 */
exports.update = (req, res) => {};

/**
 * controller method to delete a blog with the specified id in the request
 */
exports.delete = (req, res) => {};

/**
 * controller method to delete all blogs from the database
 */
exports.deleteAll = (req, res) => {};

/**
 * controller method to find all published blogs
 */
exports.findAllPublished = (req, res) => {};