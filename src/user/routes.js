const { Router } = require("express");
const userRouter = Router();
const { createUser, readUser, readAllUsers, deleteUser, updateUser, login, addFriend } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");
const { create } = require("./model");

// admin routes
userRouter.post("/admin", readAllUsers); //

// user routes
userRouter.get("/user", tokenCheck, readUser) //
userRouter.post("/user", hashPass, createUser);//
userRouter.delete("/user", tokenCheck, comparePass, deleteUser); //
userRouter.patch("/user", tokenCheck, comparePass, updateUser) //

// login routes
userRouter.get("/login", tokenCheck, login) //
userRouter.post("/login", comparePass, login) //

// add friends
userRouter.patch("/friend", tokenCheck, addFriend, createUser) //

module.exports = userRouter;

