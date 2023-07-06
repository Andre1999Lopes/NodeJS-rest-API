import BadRequest from "../errors/BadRequestError.js";

const pagination = async (req, res, next) => {
  let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

  let [campoOrdenacao, ordem] = ordenacao.split(":");

  limite = parseInt(limite);
  pagina = parseInt(pagina);
  ordem = parseInt(ordem);

  const query = req.result;

  if (limite > 0 && pagina > 0) {
    const result = await query
      .find()
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite);
    return res.status(200).json(result);
  }
  next(new BadRequest());
};

export default pagination;
