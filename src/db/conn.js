const { Sequelize } = require("sequelize");
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
    }
);

try {
    sequelize.authenticate();
    console.log("Conectado com sucesso");
} catch (error) {
    console.log("Erro ao se conectar: " + error);
}

module.exports = sequelize;
