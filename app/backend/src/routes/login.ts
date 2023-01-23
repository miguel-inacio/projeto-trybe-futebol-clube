import express = require('express');
import { validateLoginBody, validateCredential } from '../middlewares/login';
import LoginController from '../controllers/login';

const loginController = new LoginController();

const router = express.Router();

router.post('/', validateLoginBody, loginController.userLogin.bind(loginController));

router.get('/validate', validateCredential, loginController.getUserRole.bind(loginController));

export default router;
