const express = require("express");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();

const PORT = 8000;

// connection of mongoose with database
// this is the url of the database
// this is a promise, then and catch methods
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log(`error: ${error}`));

// middleware: plugin
app.use(express.urlencoded({ extended: false }));
// making our own middle ware,
app.use(logReqRes("log.txt"));

//routes
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
