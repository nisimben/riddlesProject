import riddlesArr from './riddles/module.js'
import genPerson from './utils/genPerson.js';
import riddleMaker from './utils/genRiddles.js'
import timeMeasure from './utils/timeMeasure.js '


function genPlayer(){
    const player = genPerson()
    return player
}

function askQuestions(player){
    let totalTime = 0;
    const timePerRiddle = [];

    const riddles = riddleMaker(riddlesArr)
    riddles.forEach((riddle)=>{
        const time = timeMeasure(riddle.ask.bind(riddle))
        totalTime+=time;
        timePerRiddle.push(time)
        player.answeredQuestion()
    })
    console.log(`done!`);
    console.log(`total time [sec]: ${totalTime/1000}`);
    const avg = totalTime/timePerRiddle.length
    console.log(`avg time [sec]: ${Math.floor(avg/1000)}`);
    console.log(`total questions answered by plyaer: ${player.name}: ${player.totalQuestionsAnswered}`);
    
}

function runGame(){
    const player = genPlayer()
    askQuestions(player)
}

runGame()