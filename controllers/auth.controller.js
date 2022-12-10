const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //Save the user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if(req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            });
        } else {
            // 1 is associated with user role
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(async (user) => {
        if(!user){
            return res.status(404).send({ message: "User Not Found." });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        let authorities = [];
        user.getRoles().then(roles => {
            for(const element of roles){
                authorities.push("ROLE_" + element.name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};