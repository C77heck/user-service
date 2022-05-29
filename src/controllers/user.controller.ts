import express, { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import path from 'path';
import { v4 } from 'uuid';
import { ERROR_MESSAGES, MESSAGES } from '../libs/constants';
import { HttpError } from '../models/http.error';
import Users from '../models/user.model';
import { FileInterface } from './interfaces/file.interface';

export const getUser = async (req: express.Request, res: any, next: NextFunction) => {
  try {
    res.sendFile(`${path.resolve()}/attachments/files/${req.params.fileName}`);
  } catch (e) {
    return next(new HttpError(e as any));
  }
};

export const createUser = async (req: any, res: any, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR_MESSAGES.INVALID_INPUT_DATA, 422));
  }

  try {
    const file: FileInterface = req.files?.file;
    const uploadName = file?.name;
    const name = `${v4()}.webp`;
    const url = `${process.env.FILE_PATH}/api/attachments/${name}`;
    const save = `${path.resolve()}/attachments/files/${name}`;

    const createdUser = new Users({
      url, uploadName, name,
      size: file.size,
      encoding: file.encoding,
      mimeType: file.mimetype
    });

    createdUser.save();

    res.status(201).json({ attachment: createdUser });
  } catch (e) {
    return next(new HttpError(ERROR_MESSAGES.GENERIC));
  }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    await Users.deleteUser(userId);
  } catch (e) {
    return next(new HttpError(e as any));
  }

  await res.status(200).json({ successMessage: MESSAGES.DELETED_SUCCESSFULLY });
};
