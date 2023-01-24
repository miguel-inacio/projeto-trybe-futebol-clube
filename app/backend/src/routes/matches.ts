import express = require('express');
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = express.Router();

router.post('/', matchesController.addMatchInProgress.bind(matchesController));

router.patch('/:id/finish', matchesController.finishMatch.bind(matchesController));

router.get('/', matchesController.getAllMatches.bind(matchesController));

export default router;
