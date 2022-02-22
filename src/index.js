import express from "express";
import routes from "./routes";
import "./database";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const conn = require("./db/conn");

const app = express();
const port = 3335;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

conn.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
