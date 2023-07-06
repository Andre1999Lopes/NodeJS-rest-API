import NotFoundError from "../errors/NotFoundError.js";
import { autores } from "../models/index.js";

class AutoresController {
  static ListarAutores = async (req, _, next) => {
    try {
      req.result = autores.find();
      next();
    } catch (err) {
      next(err);
    }
  };

  static ListarAutorPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findById(id);
      if (result !== null) {
        return res.status(200).json(result);
      }
      next(new NotFoundError("Autor não encontrado"));
    } catch (err) {
      next(err);
    }
  };

  static CadastrarAutor = async (req, res, next) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).json({ message: "autor cadastrado com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static AtualizarAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (result !== null) {
        return res
          .status(200)
          .json({ message: "autor atualizado com sucesso" });
      }
      next(new NotFoundError("Autor não encontrado"));
    } catch (err) {
      next(err);
    }
  };

  static ExcluirAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findByIdAndDelete(id);
      if (result !== null) {
        return res.status(200).json({ message: "autor excluído com sucesso" });
      }
      next(new NotFoundError("Autor não encontrado"));
    } catch (err) {
      next(err);
    }
  };
}

export default AutoresController;
