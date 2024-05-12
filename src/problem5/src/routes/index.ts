import express from 'express';
import user from './user';

const router = express.Router();

router.use('/v1/api', user);

export default router;
