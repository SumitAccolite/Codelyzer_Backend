import { Component , Input} from '@angular/core';

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
  questions = ['Question 1', 'Question 2', 'Question 3'];

}

