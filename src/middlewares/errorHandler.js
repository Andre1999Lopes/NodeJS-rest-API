import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import BadRequest from "../errors/BadRequestError.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return new BadRequest().sendRes(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    return new ValidationError(err).sendRes(res);
  } else if (err instanceof BaseError) {
    return err.sendRes(res);
  }

  return new BaseError().sendRes(res);
};

export default errorHandler;
