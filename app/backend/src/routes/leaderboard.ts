import express = require('express');
import LeaderboardController from '../controllers/leaderboard';

const leaderboardController = new LeaderboardController();

const router = express.Router();

router.get('/home', leaderboardController.getAllTeams.bind(leaderboardController));

router.get('/away', leaderboardController.getAllTeams.bind(leaderboardController));

export default router;
