import { Router } from "express";
import cookieParser from 'cookie-parser';
import adminRouter from './admin-router';
import correctorRouter from './corrector-router';
import correctionRouter from './correction-router';

const appRouter: Router = Router();
appRouter.use(cookieParser());

appRouter.use('/api', adminRouter);
appRouter.use(`/api`, correctorRouter);
appRouter.use(`/api`, correctionRouter);

export default appRouter;
