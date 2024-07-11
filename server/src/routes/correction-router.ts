import { Router } from 'express';
import AdminMiddleware from '../middlewares/admin-middleware';
import CorrectionMiddleware from '../middlewares/correction-middleware';
import CorrectionController from '../controllers/correction-controller';

const correctionRouter: Router = Router();

correctionRouter.use(AdminMiddleware.authorization);
correctionRouter.get('/corrections/:id', CorrectionMiddleware.validateParamsToGetCorrection, CorrectionController.getCorrectionByCorrectorId);
correctionRouter.post('/corrections', CorrectionMiddleware.validateRequestBodyCorrection, CorrectionController.createNewCorrection);
correctionRouter.delete('/corrections/:id', CorrectionMiddleware.validateParamsToGetCorrection, CorrectionController.deleteCorrection);
correctionRouter.patch('/corrections/:id', CorrectionMiddleware.validateParamsToGetCorrection, CorrectionController.updateCorrection);

export default correctionRouter;