const express = require('express');
const router = express.Router();
const { Curso, Aluno } = require('../models');

 
router.get("/", async (req, res) => {
  const cursos = await Curso.findAll();
  res.render("base", {
    title: "Cursos",
    view: "cursos/show",
    cursos,
  });
});

 
router.get("/add", (req, res) => {
  res.render("base", {
    title: "Adicionar Curso",
    view: "cursos/add",
  });
});

 
router.post("/add", async (req, res) => {
  await Curso.create({ nome: req.body.nome, duracao: req.body.duracao });
  res.redirect("/cursos");
});

 
router.get("/:id/add-alunos", async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  const alunos = await Aluno.findAll();
  res.render("base", {
    title: `Adicionar Alunos ao Curso ${curso.nome}`,
    view: "cursos/add-alunos",
    curso,
    alunos,
  });
});

 
router.post("/:id/add-alunos", async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  await curso.addAlunos(req.body.alunos);  
  res.redirect(`/cursos/${curso.id}`);
});

module.exports = router;
