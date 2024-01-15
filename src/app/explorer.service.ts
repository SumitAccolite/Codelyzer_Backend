import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  private apiUrl = 'http://localhost:8080/api/explorer';

  constructor(private http: HttpClient) {}

  getExplorerData(): Observable<any[]> {
    
    
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getFileContent(absolutePath: string): Observable<{content:string}> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    const requestData = { absolutePath: absolutePath };

    return this.http.post<{ content: string }>(
      `${this.apiUrl}/file-content`,
      requestData,
      options
    );
  }
  
  createNewFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], fileName, { type: 'text/plain' });

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContent = fileReader.result as string;
      localStorage.setItem(fileName, fileContent);
    };

    fileReader.readAsText(file);
  }
}
