import BaseError from "./baseError.js";

class NotFoundError extends BaseError {
  constructor(message = "Página não encontrada") {
    super(message, 404);
  }
}

export default NotFoundError;
