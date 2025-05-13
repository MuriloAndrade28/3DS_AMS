const express = require("express");
const router = express.Router();
const { Produto, Categoria } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os produtos
router.get("/",  async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [{ model: Categoria, as: "Categoria" }],
    });
    res.render("base", {
      title: "Produtos",
      view: "produtos/show",
      produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produtos");
  }
});

// Formulário para adicionar um novo produto
router.get("/add",  async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.render("base", {
      title: "Add Produto",
      view: "produtos/add",
      categorias,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar categorias");
  }
});

// Adicionar um novo produto
router.post("/add",  async (req, res) => {
  try {
    const { nome, valor, categoriaId } = req.body;
    await Produto.create({
      nome,
      valor,
      categoriaId,
    });
    res.redirect("/produtos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar produto");
  }
});

// Formulário para editar um produto
router.get("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id, {
      include: [{ model: Categoria, as: "Categoria" }],
    });
    const categorias = await Categoria.findAll();
    if (produto) {
      res.render("base", {
        title: "Edit Produto",
        view: "produtos/edit",
        produto,
        categorias,
      });
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produto");
  }
});

// Atualizar um produto
router.post("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, valor, categoriaId } = req.body;
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.update({ nome, valor, categoriaId });
      res.redirect("/produtos");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o produto");
  }
});

// Deletar um produto
router.post("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.destroy();
      res.redirect("/produtos");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir produto");
  }
});

module.exports = router;
