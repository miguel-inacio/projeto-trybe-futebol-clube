import express = require('express');
import validateLoginBody from '../middlewares/login';
import LoginController from '../controllers/login';

const loginController = new LoginController();

const router = express.Router();

router.post('/', validateLoginBody, loginController.userLogin.bind(loginController));

export default router;
