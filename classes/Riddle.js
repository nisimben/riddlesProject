import PromptSync from 'prompt-sync';
const prompt = PromptSync();

export class Riddle {
    constructor(riddleObj) {
        this.id = riddleObj.id;
        this.name = riddleObj.name;
        this.taskDescription = riddleObj.taskDescription;
        this.correctAnswer = riddleObj.correctAnswer;
    }
    
    ask(){
        console.log(`question is: ${this.taskDescription}]\n\n`);
        let answer = prompt('What is your answer?\t');
        while(answer!==this.correctAnswer){
            console.log(`Wrong answer. Please try again. Press X to exit.`);
            answer = prompt('What is your answer?\t');
            if(answer.toLocaleLowerCase() === "x"){
                console.log(`you exit the game. bye!`);
                return
            }
        }
        console.log(`Correct answer! Good job`);
    }
}