const Monitor = require("../models/monitor");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originMonitor } = req.body;
    const monitor = new Monitor({ origin: originMonitor });
    console.log(monitor);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});
