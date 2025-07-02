import {question} from 'readline-sync';


export class Riddle {
    constructor(riddleObj) {
        this.id = riddleObj.id;
        this.name = riddleObj.name;
        this.taskDescription = riddleObj.taskDescription;
        this.correctAnswer = riddleObj.correctAnswer;
    }

ask(){;
    let correctAnswer = this.correctAnswer.toLowerCase();
    let answer = "";

        while (answer !== correctAnswer && answer !== 'x') {
        console.log(`Question: ${this.taskDescription}`);
        answer = question('What is your answer?\t');

        if (!answer) continue;

        const normalized = answer.toLowerCase();

        if (normalized === correctAnswer) {
            console.log(" Correct answer! Good job.");
            break;
        }

        if (normalized === 'x') {
            console.log(" Skipping to next question...");
            break;
        }

        console.log(" Wrong answer. Try again or press X to skip.");
    }
}


}
