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
    id_doc_doador: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_doc_ong: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_doc_donation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


Donator.belongsToMany(Organization, {
    through: "Donation",
});


Organization.belongsToMany(Donator, {
    through: "Donation",
});


module.exports = Donation;
