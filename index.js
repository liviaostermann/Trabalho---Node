//Esta linha imprime a mensagem "Node está funcionando" no console, indicando que o script foi iniciado corretamente.
console.log("Node está funcionando");
//Importa o módulo express, que é um framework para Node.js usado para criar servidores web
const express = require("express");

//importação de módulos personalizados
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

//Chama o método sync no objeto conexao do módulo banco. 
//Esse método sincroniza o estado do banco de dados com os modelos definidos no código. 
banco.conexao.sync(function () {
  console.log("Banco de dados conectado.");
});

//1. Ler todos os registros da entidade A e B (1 ponto).
//ATLETAS
app.get("/atletas/", async function (req, res) {
  const resultado = await atleta.atleta.findAll();
  res.send(resultado);
});

//METAS
app.get("/metas/", async function (req, res) {
  const resultado = await meta.meta.findAll();
  res.send(resultado);
});

//2. Ler apenas um registo pelo id da entidade A e B (1 ponto).
//ATLETAS
app.get("/atletas/:id", async function (req, res) {
  const resultado = await atleta.atleta.findByPk(req.params.id, {
    include: { model: meta.meta },
  });
  //verifica se o resultado da busca é null
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});

//METAS
app.get("/metas/:id", async function (req, res) {
  const resultado = await meta.meta.findByPk(req.params.id, {
    include: { model: atleta.atleta },
  });
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});

//3. Ler subconjunto de registros, buscando por um atributo da entidade A e B (3 pontos).
//ATLETAS
app.get("/atletas/nome/:nome", async function (req, res) {
  const resultado = await atleta.atleta.findAll({
    where: { nome: req.params.nome },
    include: { model: meta.meta },
  });
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});
//METAS
app.get("/metas/titulo/:titulo", async function (req, res) {
  const resultado = await meta.meta.findAll({
    where: { titulo: req.params.titulo },
    include: { model: atleta.atleta },
  });
  if (resultado == null) {
    res.status(404).send({});
  } else {
    res.send(resultado);
  }
});

//4. Criar um registro da entidade A e B (2 pontos).
//ATLETAS
app.post("/atletas/", async function (req, res) {
  const resultado = await atleta.atleta.create({
    nome: req.body.nome,
    idade: req.body.idade,
  });
  res.send(resultado);
});
//METAS
app.post("/metas/", async function (req, res) {
  const resultado = await meta.meta.create({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    atletumId: req.body.atletumId,
  });
  res.send(resultado);
});

//5. Atualizar um registro da entidade A e B (2 pontos).
//ATLETAS
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

//METAS
app.put("/metas/:id", async function (req, res) {
  const resultado = await meta.meta.update(
    {
      //primeiro parametro = atributos
      //body = corpo da requisição no insomnia
      titulo: req.body.titulo,
      descricao: req.body.descricao,
    },
    {
      where: { id: req.params.id },
    }
  );

  if (resultado == 0) {
    res.status(404).send({});
  } else {
    res.send(await meta.meta.findByPk(req.params.id));
  }
});

//6. Excluir um registro da entidade A e B (1 ponto).
//ATLETAS
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

//METAS
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
