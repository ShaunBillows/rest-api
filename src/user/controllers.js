const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
  // creates a new user
  console.log("Request recieved.");
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET)
    res.status(200).send({ msg: "Request processed.", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};

exports.readUser = async (req, res) => {
  console.log("Request recieved.");
  try {
    console.log("Retrieving user.");
    const user = { username: req.user.username, email: req.user.email }
    console.log("Removing password from user.");
    console.log(user.password);
    console.log(user);
    console.log("Sending response.");
    res.status(200).send({ msg: "Request processed.", user })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

exports.readAllUsers = async (req, res) => {
  // returns all usernames in db
  console.log("Request recieved.");
  try {
    const result = await User.find();
    const allUsers = result.map( x => x.username) ;
    console.log(allUsers);
    res.status(200).send({ msg: "Request processed.", allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};

exports.deleteUser = async (req, res) => {
  // deletes a user, searches by username
  console.log("Request recieved.");
  try {
    console.log(req.user.username);
    const result = await User.deleteOne({username: req.user.username});
    console.log(result);
    res.status(200).send({ msg: "Request processed.", result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};

exports.replaceUser = async (req, res) => {
  // createUser and deleteUser
  console.log("Request recieved.");
  try {
    const result = await User.replaceOne({ username: req.body.oldUsername }, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
   });
    console.log(result);
    res.status(200).send({ msg: "Request processed.", result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};

exports.updateUser = async (req, res) => {
  console.log("Request recieved.");
  // updates a user's password and/or email, searches by username
  try {
    let result
    if (req.body.password) {
      result = await User.updateOne({ username: req.body.username }, { password: req.body.password })
    }
    if (req.body.email) {
      result = await User.updateOne({ username: req.body.username }, { email: req.body.email })
    }
    console.log(result)
    res.status(200).send({ msg: "Request processed.", result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}

exports.login = async (req, res) => {
  console.log("Request recieved.");
  try {
    const token = await jwt.sign({ id_: req.user._id }, process.env.SECRET)
    res.status(200).send({ msg: "Request processed.", token })
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}