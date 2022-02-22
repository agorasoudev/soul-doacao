const { DataTypes } = require("sequelize");
const db = require("../../db/conn");

const Organization = db.define("Organization", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    caixa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_doc_ong: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
    },
});

module.exports = Organization;
