import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import adminOnlyMiddleware from './app/middlewares/adminOnly';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

const routes = new Router();

// Students
routes.post('/sessions', SessionController.store);

// Users
routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// Students
routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/help_orders', HelpOrderController.index_student);
routes.post('/students/:id/help_orders', HelpOrderController.store);

// Help Orders
routes.get('/help_orders/', HelpOrderController.index);

// Plans
routes.use(adminOnlyMiddleware);
routes.get('/admin/plans', PlanController.index);
routes.post('/admin/plans', PlanController.store);
routes.put('/admin/plans/:id', PlanController.update);
routes.delete('/admin/plans/:id', PlanController.delete);

// Registrations
routes.get('/admin/registrations', RegistrationController.index);
routes.post('/admin/registrations', RegistrationController.store);
routes.put('/admin/registrations/:id', RegistrationController.update);
routes.delete('/admin/registrations/:id', RegistrationController.delete);

export default routes;
