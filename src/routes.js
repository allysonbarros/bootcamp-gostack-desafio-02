import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import adminOnlyMiddleware from './app/middlewares/adminOnly';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.use(adminOnlyMiddleware);

routes.get('/admin/plans', PlanController.index);
routes.post('/admin/plans', PlanController.store);
routes.put('/admin/plans/:id', PlanController.update);
routes.delete('/admin/plans/:id', PlanController.delete);

routes.get('/admin/registrations', RegistrationController.index);
routes.post('/admin/registrations', RegistrationController.store);
routes.put('/admin/registrations/:id', RegistrationController.update);
routes.delete('/admin/registrations/:id', RegistrationController.delete);

export default routes;
