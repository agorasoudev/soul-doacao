import express from 'express'
import routes from './routes'
import './database'
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

const app = express()
const port = 3333

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 