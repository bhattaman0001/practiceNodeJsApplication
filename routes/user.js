const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdatedUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/controllers");

const router = express.Router();

/* router.get("/users", async (req, res) => {
  const allDbData = await User.find({}); // it means get all the data from database
  const html = `
        <ul>
            ${allDbData
              .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
              .join("")}
        </ul>
    `;
  res.send(html);
}); */

// rest apis routes

// router.get("/", handleGetAllUsers);

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

// router.post("/", handleCreateNewUser);

/* since get('/') and post('/') has same routes so we can group them together */
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

/*since patch, get, delete methods has same routes so we can group them together */
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdatedUserById)
  .delete(handleDeleteUserById);

// we have first registered the routes in the router and then exported it.
module.exports = router;
