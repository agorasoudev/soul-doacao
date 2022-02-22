const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const Donator = require("./SeqDoador");
const Organization = require("./SeqOng");

const Donation = db.define("Donation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_doador: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    id_ong: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    id_documento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Donation.belongsToMany(Donator, { foreignKey: "id_doador" });
Donation.belongsToMany(Organization, { foreignKey: "id_ong" });

module.exports = Donation;
