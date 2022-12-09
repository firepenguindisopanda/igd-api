module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blogs", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.BOOLEAN
        }
    });
    return Blog;
};