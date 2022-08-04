const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model")

exports.hashPass = async (req, res, next) => {
    // take a password out of the body, hashes that password with bcrypt, and then put it back in the body
    try {
        console.log("Hashing password.");
        req.body.password = await bcrypt.hash(req.body.password, 8)
        console.log("Sending request to controller.");
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message })
    }
}

exports.comparePass = async (req, res, next) => {
    //finds user in database, compares password from body with password from db
    //if successful pass user to controller through req, if unsuccessful send error
    try {
        console.log("Finding user");
        req.user = await User.findOne({ username: req.body.username })
        console.log("Checking password.");
        if (req.user && (await bcrypt.compare(req.body.password, req.user.password))) {
            console.log("Sending request to controller.");
            next()
        } else {
            throw "Incorrect credentials.";
        }
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
}

exports.tokenCheck = async (req, res, next) => {
    // gets the token from req, unlocks the token, finds a user with the id in the token, send the user to a controller
    try {
        console.log("Checking for Auth token.");
        const token = req.header("Authorization")
        console.log(token);
        console.log("Decoding token.");
        const decodedToken = await jwt.verify(token, process.env.SECRET)
        console.log(decodedToken);
        console.log("Finding user by token id.");
        const user = await User.findById(decodedToken.id_)
        console.log("Passing user to request.");
        req.user = user
        console.log("Sending request to controller.");
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error })
    }
}

