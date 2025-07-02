import Person from '../classes/Player.js'
import {question} from 'readline-sync';


export default function genPerson(){
    let name = question('What is your name?\t');
    return new Person(name)

}