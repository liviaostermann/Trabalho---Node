console.log("Node está funcionando");

const express = require("express");
const banco = require("./banco");
const atleta = require("./atleta");
const meta = require("./meta");

const app = express();
app.use(express.json());

const PORTA = 3000;

//Inicia o servidor na porta x
app.listen(PORTA, function () {
  console.log("servidor inicada na porta" + PORTA);
});

//pegar todos os atletas
app.get("/atletas/", async function (req, res) {
  const resultado = await atleta.atleta.findAll();
  res.send(resultado);
});

banco.conexao.sync(function () {
  console.log("Banco de dados conectado.");
});

//pegar atleta pelo id 
app.get("/atletas/:id", async function (req, res) {
  const resultado = await atleta.atleta.findByPk(req.params.id);
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});

//criar atleta
app.post("/atletas/", async function (req, res) {
  const resultado = await atleta.atleta.create({
    nome: req.body.nome,
    idade: req.body.idade,
  });
  res.send(resultado);
});

app.put("/atletas/:id", async function (req, res) {
  const resultado = await atleta.atleta.update(
    {
      //primeiro parametro = atributos
      //body = corpo da requisição no insomnia
      nome: req.body.nome,
      idade: req.body.idade,
    },
    {
      //segundo parametro: regra de atualização
      where: { id: req.params.id },
    }
  );
  //se o id não existe
  if (resultado == 0) {
    res.status(404).send({});
  } else {
    res.send(await atleta.atleta.findByPk(req.params.id));
  }
});

app.delete("/atletas/:id", async function (req, res) {
  const resultado = await atleta.atleta.destroy({
    where: { id: req.params.id },
  });
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.status(204).send({});
  }
});
