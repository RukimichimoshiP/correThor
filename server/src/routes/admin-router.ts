import { Router } from 'express';
import AdminMiddleware from '../middlewares/admin-middleware';
import AdminController from '../controllers/admin-controller';

const adminRouter: Router = Router();

adminRouter.use(AdminMiddleware.authorization);
adminRouter.get('/admin', AdminController.handleLoginRequest);

export default adminRouter;