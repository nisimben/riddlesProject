export default class Person {
    constructor(name) {
        this.name= name;
        this.totalQuestionsAnswered = 0;
    }
    answeredQuestion(){
        this.totalQuestionsAnswered +=1
    }
    getTotalQuestions(){
        return this.totalQuestionsAnswered;
    }
}