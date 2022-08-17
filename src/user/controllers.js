const jwt = require("jsonwebtoken");
const User = require("./model");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  // returns a jws token
  console.log("Request recieved by login.");
  try {
    const token = await jwt.sign({ id_: req.user._id }, process.env.SECRET)
    res.status(200).send({ msg: "Request processed.", token })
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
}

exports.readAllUsers = async (req, res) => {
  // returns all usernames in the db
  console.log("Request recieved readAllUsers.");
  try {
    const result = await User.find();
    const allUsers = result.map( x => x.username) ;
    console.log(allUsers);
    res.status(200).send({ msg: "Request processed.", allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
}

exports.createUser = async (req, res) => {
  // creates a new user 
  console.log("Request recieved by createUser.");
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET)
    // note: we create a jwt token on the mongo db user id, 
    // hence when we decode it we can search for a user document by this id
    res.status(200).send({ msg: "Request processed.", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.readUser = async (req, res) => {
  // returns the user's info, except the password
  console.log("Request recieved by readUser.");
  try {
    console.log("Retrieving user.");
    console.log(req.user);
    const user = { username: req.user.username, email: req.user.email }
    console.log("Removing password from user.");
    console.log(user);
    console.log("Sending response.");
    res.status(200).send({ msg: "Request processed.", user })
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message })
  }
}

exports.updateUser = async (req, res) => {
  // updates user info
  console.log("Request recieved by updateUser.");
  try {
    let result
    if (req.body.newPassword) {
      console.log("Patching password.");
      const newPassword = await bcrypt.hash(req.body.newPassword, 8)
      result = await User.updateOne({ username: req.user.username }, { password: newPassword })
    }
    if (req.body.newEmail) {
      console.log("Patching email.");
      result = await User.updateOne({ username: req.user.username }, { email: req.body.newEmail })
    }
    if (req.body.newUsername) {
      console.log("Patching username.");
      result = await User.updateOne({ username: req.user.username }, { username: req.body.newUsername })
    }
    console.log(result)
    res.status(200).send({ msg: "Request processed.", result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  // deletes a user, searches by username
  console.log("Request recieved deleteUser.");
  console.log(req.query);
  try {
    console.log(req.body);
    console.log(req.user.username);
    const result = await User.deleteOne({username: req.user.username});
    console.log(result);
    res.status(200).send({ msg: "Request processed.", result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};