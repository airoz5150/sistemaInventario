const Users = require("../models/Users");
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { originUsers } = req.body;
  const users = new Users({ origin: originUsers });
  console.log(users);
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});
