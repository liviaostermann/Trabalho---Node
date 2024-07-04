const sequelize = require("sequelize");
const banco = require("./banco");
const meta = require("./meta");

var atleta = banco.conexao.define(
  "atleta",
  {
    id: {
      type: sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },
    idade: {
      type: sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  { timestamps: false }
);

//FK
atleta.hasMany(meta.meta);
meta.meta.belongsTo(atleta);

module.exports = { atleta };
