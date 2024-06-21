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
app.get("/metas/", async function (req, res) {
  const resultado = await meta.meta.findAll();
  res.send(resultado);
});

banco.conexao.sync(function () {
  console.log("Banco de dados conectado.");
});

//pegar atleta pelo id 
app.get("/metas/:id", async function (req, res) {
  const resultado = await meta.meta.findByPk(req.params.id);
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});

//criar atleta
app.post("/metas/", async function (req, res) {
  const resultado = await meta.meta.create({
    titulo: req.body.titulo,
    requisicao: req.body.descricao,
  });
  res.send(resultado);
});

app.put("/metas/:id", async function (req, res) {
  const resultado = await meta.meta.update(
    {
      //primeiro parametro = atributos
      //body = corpo da requisição no insomnia
      titulo: req.body.titulo,
      descricao: req.body.descricao,
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
    res.send(await meta.meta.findByPk(req.params.id));
  }
});

app.delete("/metas/:id", async function (req, res) {
  const resultado = await meta.meta.destroy({
    where: { id: req.params.id },
  });
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.status(204).send({});
  }
});
