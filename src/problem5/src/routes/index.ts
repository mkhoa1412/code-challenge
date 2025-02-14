import { Application } from 'express';
import apiRouter from './apiRouter';
function route(app: Application) {
  app.use('/api', apiRouter);
}
export default route;
