const Telefonica = require("../models/telefonica");
router.post("/", async (req, res) => {
    // console.log(req.body);
    const { originTelefonica } = req.body;
    const telefonica = new Telefonica({ origin: originTelefonica });
    console.log(telefonica);
    try {
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});
