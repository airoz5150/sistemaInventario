const Mouse = require("../models/mouse");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originMouse } = req.body;
    const mouse = new Mouse({ origin: originMouse });
    console.log(mouse);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});