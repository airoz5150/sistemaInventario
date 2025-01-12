const Moviles = require("../models/moviles");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originMoviles } = req.body;
    const moviles = new Moviles({ origin: originMoviles });
    console.log(moviles);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});