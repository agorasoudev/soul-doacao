const mongoose = require("mongoose");
import 'dotenv/config';

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}

main()
    .then(() => console.log("Conectado ao Mongo"))
    .catch((err) => console.log(err));

module.exports = mongoose;
