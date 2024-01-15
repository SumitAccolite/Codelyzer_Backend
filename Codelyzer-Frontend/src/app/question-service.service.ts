import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
  private apiUrl = 'http://localhost:8080/api/test/questions';

  constructor(private http: HttpClient) { }
  getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiUrl}/1`);
  }
}
