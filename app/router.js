import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Player from './controllers/player_controller';
import * as Games from './controllers/game_controller';

const router = Router();

router.post('/signin', Users.signin);
router.post('/signup', Users.signUp);
router.post('/createplayers', Player.createPlayers);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our mafia game api!' });
});

router.post('/getNameFromFBID', Users.getNameFromFBID);

router.get('/users', Users.getUsers);

router.get('/user/:id', Users.getUser);

router.post('/signin', Users.authUser);

router.get('/players', (req, res) => {
  Player.getPlayers(req, res);
});

router.put('/users', Users.assignRoles);

router.post('/games', Games.createGame);

router.put('/games', Games.updatePlayers);

router.get('/games', Games.getGames);

router.get('/players/:id', (req, res) => {
  Player.getPlayer(req, res);
});

export default router;
