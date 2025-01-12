const Reguladores = require("../models/reguladores");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originReguladores } = req.body;
    const reguladores = new Reguladores({ origin: originReguladores });
    console.log(reguladores);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});