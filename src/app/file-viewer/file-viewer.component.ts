// file-viewer.component.ts

import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MonacoEditorService } from '../monaco-editor.service';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, OnDestroy {
  @Input() fileContent: string | undefined;

  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  private editor!: monaco.editor.IStandaloneCodeEditor;

  constructor(private monacoEditorService: MonacoEditorService) {}

  ngOnInit(): void {
    this.monacoEditorService.initMonaco().then(() => {
      this.editor = this.monacoEditorService.createEditor(
        this.editorContainer.nativeElement,
        'plaintext',
        this.fileContent || ''
      );
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  setContent(content: string): void {
    console.log(' setting coneten ', content);
    
    if (this.editor) {
      this.editor.setValue(content);
    }
  }
}
