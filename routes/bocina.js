const Bocina = require("../models/bocina");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originBocina } = req.body;
    const bocina = new Bocina({ origin: originBocina });
    console.log(bocina);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});