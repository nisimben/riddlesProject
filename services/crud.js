// riddles/crud.js
import fs from 'fs';
import {question} from 'readline-sync';

const DB_PATH = './db/riddles.txt';

function loadRiddles() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveRiddles(riddles) {
  fs.writeFileSync(DB_PATH, JSON.stringify(riddles, null, 2), 'utf-8');
}

export function createRiddle() {
  const name = question('Enter riddle name: ');
  const taskDescription = question('Enter description: ');
  const correctAnswer = question('Enter correct answer: ');

  const riddles = loadRiddles();
  const newId = riddles.reduce((max, r) => Math.max(max, r.id), 0) + 1;
  riddles.push({ id: newId, name, taskDescription, correctAnswer });
  saveRiddles(riddles);
  console.log('Riddle created successfully.');
}

export function readRiddles() {
  const riddles = loadRiddles();
  if (riddles.length === 0) {
    console.log('No riddles found.');
    return;
  }
  console.log('\n All Riddles:');
  riddles.forEach(r => {
    console.log(`ID: ${r.id} | ${r.name} | ${r.taskDescription} | Correct Answer: ${r.correctAnswer}`);
  });
}

export function updateRiddle() {
  const id = parseInt(question('Enter ID to update: '));
  const riddles = loadRiddles();
  const riddle = riddles.find(r => r.id === id);

  if (!riddle) {
    console.log('Riddle not found.');
    return;
  }

  const name = question(`New name (${riddle.name}): `) || riddle.name;
  const taskDescription = question(`New description (${riddle.taskDescription}): `) || riddle.taskDescription;
  const correctAnswer = question(`New answer (${riddle.correctAnswer}): `) || riddle.correctAnswer;

  // Object.assign(riddle, { name, taskDescription, correctAnswer });
  riddle.name = name;
  riddle.taskDescription = taskDescription;
  riddle.correctAnswer = correctAnswer;
  saveRiddles(riddles);
  console.log('Riddle updated.');
}

export function deleteRiddle() {
  const id = parseInt(question('Enter ID to delete: '));
  let riddles = loadRiddles();
  const lenBefore = riddles.length;
  riddles = riddles.filter(r => r.id !== id);
  if (riddles.length === lenBefore) {
    console.log(' No riddle found with that ID.');
  } else {
    saveRiddles(riddles);
    console.log('Riddle deleted.');
  }
}
