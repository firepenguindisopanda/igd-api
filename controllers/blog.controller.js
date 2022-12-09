const db = require("../models");
const Blog = db.blogs;
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
exports.findOne = (req, res) => {
    // get the id from the request params
    const id = req.params.id;

    // find a single blog with the id
    Blog.findByPk(id).then(data => {
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: `Cannot find Blog with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Blog with id=${id}.`
        });
    });
};

/**
 * controller method to update a blog by the id in the request
 */
exports.update = (req, res) => {
    // get the id from the request params
    const id = req.params.id;

    // update a blog by the id in the request
    Blog.update(req.body, {
        where: { id: id }
    }).then(number => {
        if(number == 1){
            res.send({
                message: `Blog with id=${id} was updated successfully.`
            });
        }else{
            res.send({
                message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Blog with id=${id}.`
        });
    });
};

/**
 * controller method to delete a blog with the specified id in the request
 */
exports.delete = (req, res) => {
    // get the id from the request params
    const id = req.params.id;

    Blog.destroy({
        where: { id: id }
    }).then(number => {
        if(number == 1){
            res.send({
                message: `Blog with id=${id} was deleted successfully.`
            });
        }else{
            res.send({
                message: `Unable to delete Blog with id=${id}. Blog was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Blog with id=${id}.`
        })
    })
};

/**
 * controller method to delete all blogs from the database
 */
exports.deleteAll = (req, res) => {
    // using truncate() method to delete all rows
    Blog.destroy({
        where: {},
        truncate: false
    }).then(numbers => {
        res.send({
            message: `${numbers} Blogs were deleted successfully!`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all blogs."
        });
    });
};

/**
 * controller method to find all published blogs
 */
exports.findAllPublished = (req, res) => {
    Blog.findAll({ where: { published: true } }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blogs."
        });
    });
};