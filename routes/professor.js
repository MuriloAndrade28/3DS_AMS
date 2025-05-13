const express = require("express");
const router = express.Router();
const { Professor } = require("../models");

 
router.get("/", async (req, res) => {
  const professores = await Professor.findAll();
  res.render("base", {
    title: "Professores",
    view: "professores/show",
    professores,
  });
});

 
router.get("/add", (req, res) => {
  res.render("base", {
    title: "Add Professor",
    view: "professores/add",
  });
});

 
router.post("/add", async (req, res) => {
  await Professor.create({ nome: req.body.nome, especialidade});
  res.redirect("/professores");
});
 