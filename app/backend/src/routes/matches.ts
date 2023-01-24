import express = require('express');
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = express.Router();

router.get('/', matchesController.getAllMatches.bind(matchesController));

export default router;
