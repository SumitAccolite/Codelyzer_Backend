import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ExplorerService } from '../explorer.service';
import { FileViewerComponent } from '../file-viewer/file-viewer.component';
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.scss',
})
export class ExplorerComponent {
  @Input() explorerData: any[] | undefined;
  @Output() folderClick = new EventEmitter<any>();
  @Output() fileClick = new EventEmitter<string>();
  selectedFileContent: string = '';
  @ViewChild(FileViewerComponent) fileViewerComponent!: FileViewerComponent ;

  constructor(private explorerService: ExplorerService) {}
  // explorer.component.ts

ngAfterViewInit(): void {
  if (this.fileViewerComponent) {
    this.fileViewerComponent.setContent(this.selectedFileContent);
  }
}

  handleItemClick(item: any): void {
    
    
    if (item.type === 'folder') {
      item.expanded = !item.expanded;
      this.folderClick.emit(item);
    } else if (item.type === 'file') {
      this.explorerService.getFileContent(item.absolutePath).subscribe({
        next: (data) => {
          this.selectedFileContent = data.content;// Assuming fileViewerComponent is the instance of FileViewerComponent
        this.fileClick.emit(this.selectedFileContent);
          console.log(data.content);
          console.log(this.selectedFileContent);
          
          
        },
        error: (error) => {
          console.error('Error fetching file content:', error);
        },
      });
    }
  }

  handleFileClick(content: string): void {
    this.fileClick.emit(content);
  }
  createNewFile(): void {
    const content = 'Hello, this is the content of the new file!';
    const fileName = 'new-file.txt';

    this.explorerService.createNewFile(content, fileName);
    console.log('New file created in local storage:', fileName);
    console.log(content);
  }
  

  private refreshExplorerData(): void {
    // Add logic to refresh or fetch updated data from the server
    // Update this.explorerData with the new data
  }

}
