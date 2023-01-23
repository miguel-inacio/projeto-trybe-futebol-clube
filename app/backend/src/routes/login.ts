import express = require('express');
import { validateLoginBody, validateData } from '../middlewares/login';
import LoginController from '../controllers/login';

const loginController = new LoginController();

const router = express.Router();

router.post('/', validateLoginBody, validateData, loginController.userLogin.bind(loginController));

export default router;
