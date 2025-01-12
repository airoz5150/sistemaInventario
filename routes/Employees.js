const Employee = require("../models/Employees");
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { originEmployee } = req.body;
  const employee = new Employee({ origin: originEmployee });
  console.log(employee);
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});
