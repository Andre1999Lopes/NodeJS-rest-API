import express from "express";
import AutoresController from "../controllers/AutoresController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/autores", AutoresController.ListarAutores, pagination)
  .get("/autores/:id", AutoresController.ListarAutorPorId)
  .post("/autores", AutoresController.CadastrarAutor)
  .put("/autores/:id", AutoresController.AtualizarAutor)
  .delete("/autores/:id", AutoresController.ExcluirAutor);
export default router;
