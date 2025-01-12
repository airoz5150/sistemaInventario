const Activities = require("../models/Activities");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originActivities } = req.body;
    const activities = new Activities({ origin: originActivities });
    console.log(activities);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});
