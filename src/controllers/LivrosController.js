import NotFoundError from "../errors/NotFoundError.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static ListarLivros = async (req, res, next) => {
    try {
      req.result = livros.find().populate("autor");
      next();
    } catch (err) {
      next(err);
    }
  };

  static ListarLivroPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findById(id).populate("autor", "nome");
      if (result !== null) {
        return res.status(200).json(result);
      }
      next(new NotFoundError("Livro não encontrado"));
    } catch (err) {
      next(err);
    }
  };

  static ListarLivrosPorFiltro = async (req, _, next) => {
    try {
      const busca = await searchProcess(req.query);
      if (busca !== null) {
        req.result = livros.find(busca).populate("autor");

        next();
      }
    } catch (err) {
      next(err);
    }
  };

  static CadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      await livro.save();
      return res.status(201).json({ message: "Livro cadastrado com sucesso" });
    } catch (err) {
      next(err);
    }
  };

  static AtualizarLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (result !== null) {
        return res
          .status(200)
          .json({ message: "Livro atualizado com sucesso" });
      }
      next(new NotFoundError("Livro não encontrado"));
    } catch (err) {
      next(err);
    }
  };

  static ExcluirLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findByIdAndDelete(id);
      if (result !== null) {
        return res.status(200).json({ message: "Livro excluído com sucesso" });
      }
      next(new NotFoundError("Livro não encontrado"));
    } catch (err) {
      next(err);
    }
  };
}

const searchProcess = async ({
  editora,
  titulo,
  minPaginas,
  maxPaginas,
  autor,
}) => {
  let busca = {};
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  if (autor) {
    const result = await autores.findOne({
      nome: { $regex: autor, $options: "i" },
    });
    if (result !== null) {
      busca.autor = result._id;
    } else busca = null;
  }
  return busca;
};

export default LivroController;
