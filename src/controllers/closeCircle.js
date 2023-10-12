const express = require("express");
const router = express.Router();

const closeCircleController = require("../services/closeCircle");

router.get("/close-circle/:phone", async (req, res) => {
    const phone = req.params.phone;

    await closeCircleController.getCloseCircles(phone)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "error extrayendo datos" });
        });
});

module.exports = router;