import NotFoundError from "../errors/NotFoundError.js";

const notFound = (req, res, next) => {
  next(new NotFoundError());
};

export default notFound;
