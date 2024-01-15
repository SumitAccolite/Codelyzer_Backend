import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDescriptionServiceService {

  constructor(private http: HttpClient) { }

  getFileContent(apiEndpoint: string): Observable<string> {
    return this.http.get(apiEndpoint, { responseType: 'text' });
  }
}
