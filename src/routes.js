import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import adminOnlyMiddleware from './app/middlewares/adminOnly';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);

routes.use(adminOnlyMiddleware);

routes.get('/admin/plans', PlanController.index);
routes.post('/admin/plans', PlanController.store);
routes.put('/admin/plans/:id', PlanController.update);
routes.delete('/admin/plans/:id', PlanController.delete);

export default routes;
