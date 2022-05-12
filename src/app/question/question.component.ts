import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';
import { WelcomeComponent } from '../welcome/welcome.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name:string="";
  public questionList:any=[]
  public currentQuestion:number=0;
  public points:number=0;
  counter:number=60;
  correctAnswer:number=0;
  wrongAnswer:number=0;
  interval$:any;
  progress:string='0'
  isQuizCompleted:boolean=false;
  welcomeText:string="Welcome";
  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();

  }

  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      console.log(res.questions)
      this.questionList=res.questions
    })
  }

  nextQuestion(){
    this.currentQuestion++;
  }

  prevQuestion(){
    this.currentQuestion--;
  }

  answer(currentQuestion:number,option:any){
    // console.log("hey")
    // console.log(this.questionList.length)
    // console.log(this.currentQuestion)
    if(currentQuestion===this.questionList.length){
      this.isQuizCompleted=true;
      this.welcomeText="Thank You";
      this.stopCounter()
    }
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();  
      }, 500);
      
    }else{
      setTimeout(() => {
        this.currentQuestion++;
        this.wrongAnswer++;
        this.resetCounter();      
        this.getProgressPercent;
      }, 500);

      
      this.points-=5;
    }

  }

  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter==0){
        this.currentQuestion++;
        this.counter=60;
        // this.points-=5; if on empty answer points to be deducted
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 6000000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }

  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
