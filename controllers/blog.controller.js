const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;

// controller method to create and save a new blog to the postgresql database
exports.create = (req, res) => {

};

/**
 * controller method to retrieve all blogs from the database
 */
exports.findAll = (req, res) => {};


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