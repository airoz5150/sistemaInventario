const InventoryReport = require("../models/inventoryReport");
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { originInventoryReport } = req.body;
  const inventoryReport = new inventoryReport({ origin: originInventoryReport });
  console.log(inventoryReport);
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});