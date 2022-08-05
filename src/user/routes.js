const { Router } = require("express");
const userRouter = Router();
const { createUser, readUser, readAllUsers, deleteUser, updateUser, login } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");

// admin routes
userRouter.get("/admin", readAllUsers);

// user routes
userRouter.get("/user", tokenCheck, readUser)
userRouter.post("/user", hashPass, createUser);
userRouter.delete("/user", tokenCheck, comparePass, deleteUser); // note: delete does not have body. User info is sent in the query string parameters.
userRouter.patch("/user", tokenCheck, comparePass, updateUser) 

// login routes
userRouter.get("/login", tokenCheck, login) // note: authorisation:token is checked in the header.
userRouter.post("/login", comparePass, login)

module.exports = userRouter;

