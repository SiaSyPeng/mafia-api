import Player from '../models/player_model';
import User from '../models/user_model';

// from stackoverflow: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle = (roles) => {
  let currentIndex = roles.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // swap
    const temp = roles[currentIndex];
    roles[currentIndex] = roles[randomIndex];
    roles[randomIndex] = temp;
  }
  return roles;
};

// Thanks to Ben Packer for help on the following two functions
const createPlayer = (userId, gameId, role) => {
  return new Promise((resolve, reject) => {
    User.findById(userId).then((user) => {
      const player = new Player({ user: userId, game: gameId, name: user.name, role });
      player.save().then((result) => {
        return resolve(result);
      });
    }).catch((err) => { return reject(err); });
  });
};

export const createPlayers = (req, res) => {
  console.log(req.body.userIds);
  const roles = ['mafia', 'doctor', 'police', 'villager', 'villager', 'villager'];
  const shuffledRoles = shuffle(roles);
  Promise.all(req.body.userIds.map((userId, idx) => { return createPlayer(userId, req.body.gameId, shuffledRoles[idx]); }))
  .then((players) => {
    res.json(players);
  })
  .catch((err) => {
    console.log(err);
  });
};

export const getPlayers = (req, res) => {
  Player.find({ game: req.params.gameID }).then((data) => {
    console.log(`getPlayers data is ${data}`);
    res.json(data);
  });
};

export const getPlayer = (req, res) => {
  Player.findById(req.params.id).then((data) => {
    res.json(data);
  });
};

export const healPlayer = (req, res) => {
  Player.findByIdAndUpdate(req.params.id, { status: true })
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const killPlayer = (req, res) => {
  Player.findByIdAndUpdate(req.params.id, { status: false })
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePlayer = (req, res) => {
  Player.findByIdAndUpdate(req.body.userId, req.body)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
