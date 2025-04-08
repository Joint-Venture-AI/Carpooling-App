import express, { Router } from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// User routes
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export const UserRoutes:Router = router;