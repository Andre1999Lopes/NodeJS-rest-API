import express from "express";
import LivroController from "../controllers/LivrosController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/livros", LivroController.ListarLivros, pagination)
  .get("/livros/busca", LivroController.ListarLivrosPorFiltro, pagination)
  .get("/livros/:id", LivroController.ListarLivroPorId)
  .post("/livros", LivroController.CadastrarLivro)
  .put("/livros/:id", LivroController.AtualizarLivro)
  .delete("/livros/:id", LivroController.ExcluirLivro);
export default router;
