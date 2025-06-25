import { Riddle } from "../classes/Riddle.js"

export default function genRiddlesClasses(riddleObjArr){
    const riddleClassesArr = riddleObjArr.map((riddleObj)=>{
        return new Riddle(riddleObj)
    })
    return riddleClassesArr;
}