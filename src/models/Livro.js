import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(A) autor(a) é obrigatório(a)"],
  },
  editora: {
    type: String,
    required: [true, "A editora do livro é obrigatória"],
    enum: {
      values: ["Casa do Código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido",
    },
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message:
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
    },
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;