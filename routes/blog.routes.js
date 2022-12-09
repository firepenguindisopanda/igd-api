module.exports = app => {
    // TODO: Update the routes to allow certain CRUD functionality for users with certain roles
    const blogs = require("../controllers/blog.controller.js");

    let router = require("express").Router();

    // create new blog
    router.post("/", blogs.create);

    // retrieve all blogs
    router.get("/", blogs.findAll);

    // retrieve all published blogs
    router.get("/published", blogs.findAllPublished);

    // retrieve a single blog with id
    router.get("/:id", blogs.findOne);

    // update a blog with id
    router.put("/:id", blogs.update);

    // delete a blog with id
    router.delete("/:id", blogs.delete);

    // delete all blogs 
    router.delete("/", blogs.deleteAll);

    app.use('/api/blogs', router);
};