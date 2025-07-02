// main.js
import readlineSync from 'readline-sync';
import { createRiddle, readRiddles, updateRiddle, deleteRiddle } from './services/crud.js';
import genPerson from './utils/genPerson.js';
import genRiddlesClasses from './utils/genRiddles.js';
import timeMeasure from './utils/timeMeasure.js';
import { loadPlayer, updateLowestTime, showLeaderboard } from './services/loadPlayer.js';
import fs from 'fs';

function loadRiddlesFromFile(path = './db/riddles.txt') {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load riddles:', err.message);
    return [];
  }
}

function playGame() {
  const riddleData = loadRiddlesFromFile();
  if (riddleData.length === 0) {
    console.log('No riddles available.');
    return;
  }

  const player = genPerson();
  const playerData = loadPlayer(player.name);
  const riddles = genRiddlesClasses(riddleData);

  let totalTime = 0;
  const timePerRiddle = [];

  riddles.forEach((riddle) => {
    console.log("=================================================");
    const time = timeMeasure(() => riddle.ask());
    console.log("=================================================");
    totalTime += time;
    timePerRiddle.push(time);
    player.answeredQuestion();
    console.log(`time [sec]: ${time / 1000} for riddle: ${riddle.name}`);
  });

  const avg = totalTime / timePerRiddle.length;
  console.log(`\nGame Summary for ${player.name}:`);
  console.log(`Total time [sec]: ${totalTime / 1000}`);
  console.log(`Average time per question [sec]: ${Math.floor(avg / 1000)}`);
  console.log(`Total questions answered: ${player.getTotalQuestions()}`);

  updateLowestTime(player.name, Math.floor(totalTime / 1000));
}

function showMenu() {
  console.log('\nRiddle Game Menu');
  console.log('1. Play the game');
  console.log('2. Create a new riddle');
  console.log('3. Read all riddles');
  console.log('4. Update a riddle');
  console.log('5. Delete a riddle');
  console.log('6. View leaderboard');
  console.log('0. Exit');
}

function main() {
  let choice;
  do {
    showMenu();
    choice = readlineSync.questionInt('Choose an option: ');
    switch (choice) {
      case 1:
        playGame();
        break;
      case 2:
        createRiddle();
        break;
      case 3:
        readRiddles();
        break;
      case 4:
        updateRiddle();
        break;
      case 5:
        deleteRiddle();
        break;
    case 6:
        showLeaderboard();
        break;
      case 0:
        console.log('Bye!');
        break;
      default:
        console.log('Invalid choice.');
    }
  } while (choice !== 0);
}

main();
