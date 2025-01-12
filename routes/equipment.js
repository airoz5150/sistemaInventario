const Equipment = require("../models/equipment");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originEquipment} = req.body;
    const equipment = new Url({ origin: originEquipment });
    console.log(equipment);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});