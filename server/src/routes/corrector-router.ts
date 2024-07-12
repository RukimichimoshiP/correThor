import { Router } from 'express';
import AdminMiddleware from '../middlewares/admin-middleware';
import CorrectorMiddleware from '../middlewares/corrector-middleware';
import CorrectionMiddleware from '../middlewares/correction-middleware';
import CorrectorController from '../controllers/corrector-controller';

const correctorRouter: Router = Router();

correctorRouter.use(AdminMiddleware.authorization);
correctorRouter.get('/correctors', CorrectorController.getAllCorrectors);
correctorRouter.post('/correctors', CorrectorMiddleware.ValidateRequestBodyCorrector, CorrectorController.createNewCorrector);
correctorRouter.put('/correctors/:id', CorrectionMiddleware.validateParamsToGetCorrection, CorrectorMiddleware.ValidateRequestBodyCorrector, CorrectorController.updateCorrector);
correctorRouter.delete('/correctors/:id', CorrectionMiddleware.validateParamsToGetCorrection, CorrectorController.deleteCorrector);

export default correctorRouter;