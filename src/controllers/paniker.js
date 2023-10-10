const express = require("express");
const router = express.Router();

const panikerController = require("../services/paniker");

router.get("/paniker/:email", async (req, res) => {
    const email = req.params.email;

    await panikerController.getPaniker(email)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "error extrayendo datos" });
        });
});

router.post("/paniker", async (req, res) => {
    const body = req.body;

    await panikerController.upsertPaniker(body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "error inserando datos" });
        });
});

module.exports = router;