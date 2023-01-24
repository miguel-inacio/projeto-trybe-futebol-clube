import express = require('express');
import TeamsController from '../controllers/teams';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/', teamsController.getAllTeams.bind(teamsController));

router.get('/:id', teamsController.getTeamById.bind(teamsController));

export default router;
