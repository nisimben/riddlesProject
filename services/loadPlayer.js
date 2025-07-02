import fs from 'fs';

const DB_PLAYER_PATH = './db/players.txt';

function loadPlayers() {
  try {
    return JSON.parse(fs.readFileSync(DB_PLAYER_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function savePlayers(players) {
  fs.writeFileSync(DB_PLAYER_PATH, JSON.stringify(players, null, 2), 'utf-8');
}

export function loadPlayer(name) {
  const players = loadPlayers();
  let player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (player) {
    if (player.lowestTime !== undefined) {
      console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);
    } else {
      console.log(`Hi ${player.name}! You haven't set a time yet.`);
    }
  } else {
    const newId = players.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    player = { id: newId, name };
    players.push(player);
    savePlayers(players);
    console.log(`Welcome ${name}, you’ve been added as a new player.`);
  }

  return player;
}

export function updateLowestTime(name, timeInSec) {
  const players = loadPlayers();
  const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (!player) return;

  if (!player.lowestTime || timeInSec < player.lowestTime) {
    player.lowestTime = timeInSec;
    savePlayers(players);
    console.log(`Congrats ${player.name}, new personal best: ${timeInSec} seconds!`);
  } else {
    console.log(`${player.name}, your current best remains ${player.lowestTime} seconds.`);
  }
}
export function showLeaderboard() {
  try {
    const playersRaw = fs.readFileSync(DB_PLAYER_PATH, 'utf-8');
    const players = JSON.parse(playersRaw)
      .filter(p => p.lowestTime !== undefined)
      .sort((a, b) => a.lowestTime - b.lowestTime);

    console.log('\nLeaderboard (by best time):');
    players.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ${p.lowestTime} seconds`);
    });
  } catch (err) {
    console.error('Failed to load leaderboard:', err.message);
  }
}
