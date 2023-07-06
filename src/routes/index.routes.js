import express from "express";
import livrosRoutes from "./livros.routes.js";
import autoresRoutes from "./autores.routes.js";

const routes = (app) => {
  app.route("/").get((_, res) => {
    res.status(200).send("Curso de Node");
  });

  app.use(express.json(), livrosRoutes, autoresRoutes);
};

export default routes;
