const   Teclado = require("../models/teclado");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originTeclado } = req.body;
    const teclado = new Teclado({ origin: originTeclado });
    console.log(teclado);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});