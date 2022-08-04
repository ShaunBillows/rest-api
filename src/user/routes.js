const { Router } = require("express");
const userRouter = Router();
const { createUser, readUser, readAllUsers, deleteUser, replaceUser, updateUser, login } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");

userRouter.get("/admin", readAllUsers); // admin path
userRouter.get("/user", tokenCheck, readUser)
userRouter.post("/user", hashPass, createUser);
userRouter.delete("/user", tokenCheck, deleteUser); // check password - note cant send body in delete - use token - can have a special token on delete - make two requests pre delete request post check password id and delete = true - controller from delete route would check for delete flag
// useRouter.deleteWithPassword("/user")
userRouter.put("/user", replaceUser) // admin
userRouter.patch("/user", updateUser) // check password

// update -  use hash passowrd need to rehash new password

// can have three dif routes for changing password - or filter route 

// note: authorisation:token is required in the header
userRouter.get("/login", tokenCheck, login)
userRouter.post("/login", comparePass, login)

module.exports = userRouter;

