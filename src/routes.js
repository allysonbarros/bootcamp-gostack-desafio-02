import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import adminOnlyMiddleware from './app/middlewares/adminOnly';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

const routes = new Router();

// Students
routes.post('/sessions', SessionController.store);

// Users
routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// Students
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/help_orders', StudentHelpOrderController.index);
routes.post('/students/:id/help_orders', StudentHelpOrderController.store);

// Help Orders
routes.get('/help_orders/', GymHelpOrderController.index);
routes.put('/help_orders/:id/answer', GymHelpOrderController.update);

// Admin - Plans
routes.use(adminOnlyMiddleware);
routes.get('/admin/plans', PlanController.index);
routes.post('/admin/plans', PlanController.store);
routes.put('/admin/plans/:id', PlanController.update);
routes.delete('/admin/plans/:id', PlanController.delete);

// Admin - Students
routes.post('/admin/students', StudentsController.store);
routes.put('/admin/students/:id', StudentsController.update);

// Admin - Registrations
routes.get('/admin/registrations', RegistrationController.index);
routes.post('/admin/registrations', RegistrationController.store);
routes.put('/admin/registrations/:id', RegistrationController.update);
routes.delete('/admin/registrations/:id', RegistrationController.delete);

export default routes;
