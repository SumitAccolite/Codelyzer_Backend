import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelloService {
  private apiUrl = 'http://localhost:8080/api/hello';

  constructor(private http: HttpClient) {}

  getHelloMessage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.apiUrl}`);
  }
}
