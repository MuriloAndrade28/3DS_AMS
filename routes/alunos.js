const express = require("express");
const router = express.Router();
const { Aluno } = require("../models");

 
router.get("/", async (req, res) => {
  const alunos = await Aluno.findAll();
  res.render("base", {
    title: "Alunos",
    view: "alunos/show",
    alunos,
  });
});

 
router.get("/add", (req, res) => {
  res.render("base", {
    title: "Adicionar Aluno",
    view: "alunos/add",
  });
});

 
router.post("/add", async (req, res) => {
  await Aluno.create({ nome: req.body.nome, idade: req.body.idade });
  res.redirect("/alunos");
});

module.exports = router;
