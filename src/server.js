require("./db/connection") //Run's database connection immediately
const cors = require("cors");
const express = require("express")
// add routes and controllers
const userRouter = require("./user/routes");
const app = express();
const port = process.env.PORT || 5000;

//add relevant routes and controllers to app before listen runs
app.use(express.json()); //Tell entire server that it will always recieve JSON, and to always send back JSON
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${PORT}.`);
  });