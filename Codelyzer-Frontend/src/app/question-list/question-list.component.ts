import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../question.model';
import { QuestionServiceService } from '../question-service.service';
import { error, log } from 'console';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',


  template: `
    <mat-button-toggle
      class="custom-question"
      [value]="question"
      [style.width.px]="width"
      [style.height.px]="height"
    >
      {{ question }}
    </mat-button-toggle>
  `,
  styles: [
    `
      .custom-question {
        margin: 2px;
        padding: 0.5rem; /* Adjust padding as needed */
        border-radius: 10px;
      }

      .custom-question:hover {
        background-color: #685ecb;
        /* Change background color on hover if desired */
        color: white;
      }
    `,
  ],
})
export class QuestionListComponent {
  @Output() questionSelected = new EventEmitter<Question>();
  questions: Question[] = [];

  constructor(private questionService: QuestionServiceService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
        this.onQuestionSelected(data[0]);
      },
      (error) => {
        console.error('Error in fetching question:', error);
      }
    );
  }
  onQuestionSelected(question: Question): void {    
    this.questionSelected.emit(question);
  }
}

