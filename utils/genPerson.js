import Person from '../classes/Player.js'
import PromptSync from 'prompt-sync';
const prompt = PromptSync();

export default function genPerson(){
    let name = prompt('What is your name?\t');
    return new Person(name)

}