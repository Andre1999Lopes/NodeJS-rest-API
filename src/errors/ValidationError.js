import BadRequest from "./BadRequestError.js";

class ValidationError extends BadRequest {
  constructor(err) {
    const errorMessages = Object.values(err.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default ValidationError;
