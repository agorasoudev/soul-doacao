const { DataTypes } = require('sequelize');
const db = require('../../db/conn');

const Donator = db.define('Donator',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_documento:{
    type: DataTypes.STRING,
    allowNull: false,
  },
})



module.exports = Donator;