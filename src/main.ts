import cors from 'cors';
import express from 'express';
import Mongoose from 'mongoose';
import { ERROR_MESSAGES } from './libs/constants';
import { setEnvs } from './libs/set-up.environment';
import { HttpError } from './models/http.error';
// eslint-disable-next-line import/extensions
import apiRouter from './routes/api.routes';
// Constants
const app = express();
setEnvs();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/
app.use('/api', apiRouter);

app.use(() => {
  throw new HttpError(ERROR_MESSAGES.INCORRECT_ROUTE, 404);
});

/***********************************************************************************
 *                         Server initialisation
 **********************************************************************************/

(async () => {
  try {
    const port = process.env.PORT || 3033;
    await Mongoose.connect(process.env.MONGO_URL || '');
    await app.listen(port, () => console.log(`app is listening on port: ${port}`));
  } catch (e) {
    console.log(e);
  }
})();
