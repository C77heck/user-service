import cors from 'cors';
import express from 'express';
import Mongoose from 'mongoose';
import { setEnvs } from './libs/set-up.environment';
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
