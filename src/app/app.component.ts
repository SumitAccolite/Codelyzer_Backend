import { Component, OnInit } from '@angular/core';
import { HelloService } from './hello.service';
import { ExplorerService } from './explorer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-project';
  

  explorerData: any[] = [];
  selectedFileContent: string | undefined;

  constructor(private explorerService: ExplorerService) {}

  ngOnInit(): void {
    this.explorerService.getExplorerData().subscribe(
      (data) => {
        this.explorerData = data;
        console.log(this.explorerData);
        
      },
      (error) => {
        console.error('Error fetching explorer data:', error);
      }
    );
  }

  handleFolderClick(folder: any): void {
    
  }

  handleFileClick(fileContent: string): void {
    this.selectedFileContent = fileContent;
  }
}
