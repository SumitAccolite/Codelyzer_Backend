import { Component, OnInit } from '@angular/core';
import { FileDescriptionServiceService } from '../file-description-service.service'

@Component({
  selector: 'app-file-description',
  templateUrl: './file-description.component.html',
  styleUrls: ['./file-description.component.scss']
})
export class FileDescriptionComponent implements OnInit {
  fileContent!: string;
  questionId!:number;

  constructor(private fileService: FileDescriptionServiceService) { }
  updateQuestionId() {
    this.questionId = 1; // Set the value to 1 when the button is clicked
    this.questionId++;
  }

  ngOnInit(): void {
    // Replace 'your-api-endpoint' with the actual API endpoint
    const apiEndpoint = 'http://localhost:8080/api/getquestion/';

    this.fileService.getFileContent(apiEndpoint)
      .subscribe(
        (data: string) => {
          this.fileContent = data;
        },
        error => {
          console.error('Failed to fetch file content:', error);
          this.fileContent = 'Failed to load file content.';
        }
      );
  }
}
