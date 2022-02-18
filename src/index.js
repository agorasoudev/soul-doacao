import express from 'express'
import routes from './routes'
import './database'
import 'dotenv/config'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

const port = 3333

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})  