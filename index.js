const express = require("express");
const banco = require("./banco");
const atleta = require("./atleta");

const app = express();
app.use(express.json());

const PORTA = 3000;

//Inicia o servidor na porta x
app.listen(PORTA, function () {
  console.log("servidor inicada na porta" + PORTA);
});

//pegar atletas
app.get("/atletas/", async function (req, res) {
  const resultado = await atleta.atleta.findAll();
  res.send(resultado);
});

