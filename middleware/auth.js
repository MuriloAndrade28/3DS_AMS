module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Faça o login");
    res.redirect("/login");
  },
};

//Use este middleware nas rotas que você deseja proteger:
Exemplo
// Listar categorias
router.get("/", ensureAuthenticated, async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render("base", {
    title: "Categorias",
    view: "categorias/show",
    categorias,
  });
});

