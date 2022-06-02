import { Router } from 'express';
import { setHeaders } from '../middlewares/custom.header';
import router from './user.routes';
import userRoutes from './user.routes';
// Export the base-router
const baseRouter = Router();

router.use(setHeaders);
// Setup routers
baseRouter.use('/users', userRoutes);

// Export default.
export default baseRouter;
