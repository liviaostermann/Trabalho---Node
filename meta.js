const sequelize = require("sequelize");
const banco = require("./banco");

var meta = banco.conexao.define(
  "meta",
  {
    id: {
      type: sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: sequelize.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);



module.exports = { meta };
