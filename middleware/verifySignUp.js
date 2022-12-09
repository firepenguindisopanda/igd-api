const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // check for duplicate username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        // check for duplicate email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(const element of req.body.roles){
            if(!ROLES.includes(element)){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + element
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;