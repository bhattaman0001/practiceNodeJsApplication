const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbData = await User.find({}); // it means get all the data from database
  // we can set our own headers and get the headers as well from client
  //   const myHeader = req.headers;
  //   console.log(myHeader);
  // always use X- in the custom headers
  //   res.setHeader("X-myName", "aman bhatt");
  return res.json(allDbData);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "no user found" });
  }
  return res.json(user); // this user is a single object
}

async function handleUpdatedUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: `success` });
}

async function handleDeleteUserById(req, res) {
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
}

async function handleCreateNewUser(req, res) {
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

  return res.status(201).json({ msg: `success`, id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdatedUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
