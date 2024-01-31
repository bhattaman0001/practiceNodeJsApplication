const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const users = require("./MOCK_DATA_FOR_TEST_PURPOSE.json");

const PORT = 8000;

// connection of mongoose with database
// we have to pass the url of database inside connect and this returns a promise of type mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

//schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

//model for database
const User = mongoose.model("user", userSchema);

// middleware: plugin
app.use(express.urlencoded({ extended: false }));

// making our own middle ware,
app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (error, data) => {
      next(); // passing to next step of the code
    }
  );
});

//routes
app.get("/users", async (req, res) => {
  const allDbData = await User.find({}); // it means get all the data from database
  const html = `
        <ul>
            ${allDbData
              .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
              .join("")}
        </ul>
    `;
  res.send(html);
});

// rest apis routes
app.get("/api/users", async (req, res) => {
  const allDbData = await User.find({}); // it means get all the data from database
  // we can set our own headers and get the headers as well from client
  const myHeader = req.headers;
  console.log(myHeader);
  // always use X- in the custom headers
  res.setHeader("X-myName", "aman bhatt");
  return res.json(allDbData);
});

// // this is dynamic parameters in express
// app.get("/api/users/:id", (req, res) => {
//   // converting string to number
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   if (!user) {
//     return res.status(404).json({ error: "no user found" });
//   }
//   return res.json(user); // this user is a single object
// });

app.post("/api/users", async (req, res) => {
  // todo: create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  /*  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./MOCK_DATA_FOR_TEST_PURPOSE.json",
    JSON.stringify(users),
    (err, data) => {
      // 201 status code means successfull response and item is created in the server
      return res.status(201).json({
        status: `Success: User created with id: ${users.length}`,
      });
    }
  ); */

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log(result);

  return res.status(201).json({ msg: `success` });
});

// app.patch("/api/users/:id", (req, res) => {
//   // todo: edit the user with id
//   return res.json({ status: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   // todo: delete user with id
//   return res.json({ status: "pending" });
// });

/*since patch and delete methods has same routes so we can group them together */

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "no user found" });
    }
    return res.json(user); // this user is a single object
  })
  .patch(async (req, res) => {
    // todo: edit the user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: `success` });
  })
  .delete(async (req, res) => {
    // todo: delete user with id
    /* const id = Number(req.params.id);
    delete users[id - 1];
    fs.writeFile(
      "./MOCK_DATA_FOR_TEST_PURPOSE.json",
      JSON.stringify(users),
      (err, data) => {
        return res.json({ status: "Success" });
      }
    ); */

    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: `success` });
  });

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
