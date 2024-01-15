// monaco-editor.component.ts

import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MonacoEditorService } from '../monaco-editor.service';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  template: '<div #editorContainer style="height: 500px; width: 100%;"></div>',
})
export class MonacoEditorComponent implements OnInit, OnDestroy {
  @Input() language: string = 'plaintext';
  @Input() content: string | undefined = '';

  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  private editor!: monaco.editor.IStandaloneCodeEditor;

  constructor(private monacoEditorService: MonacoEditorService) {}

  ngOnInit(): void {
    this.editor = this.monacoEditorService.createEditor(
      this.editorContainer.nativeElement,
      this.language,
      this.content || ''
    );
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  
}
