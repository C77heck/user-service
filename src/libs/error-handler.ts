import { validationResult } from "express-validator";
import { HttpError } from '../models/http.error';
import { ERROR_MESSAGES } from './constants';

export const handleError = (req: Request, next: (error?: HttpError) => void): any => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR_MESSAGES.INVALID_INPUT_DATA, 422));
  }
};
