import express = require('express');
import LeaderboardController from '../controllers/leaderboard';

const leaderboardController = new LeaderboardController();

const router = express.Router();

router.get('/home', leaderboardController.getAllHomeTeams.bind(leaderboardController));

// router.get('/:id', leaderboardController.getTeamById.bind(leaderboardController));

export default router;
