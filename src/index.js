const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.API_PORT || 8080;

const panikerRouter = require("./controllers/paniker");
const closeCircleRouter = require("./controllers/closeCircle");

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));

app.use(express.json());
app.use("/api", panikerRouter);
app.use("/api", closeCircleRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
    res.send("welcome to the jungle");
});

app.listen(port, () => {
    console.info(`server ok http://localhost:${port}`);
});