// src/app/monaco-editor/monaco-editor.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MonacoEditorService } from '../monaco-editor.service';

declare const monaco: any;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss']
})
export class MonacoEditorComponent implements OnInit, OnDestroy {
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  private editor: any;
  selectedLanguage: string = 'cpp'; // Default to C++
  selectedTheme: string = 'vs-dark'; // Default to Dark theme
  isFullScreen: boolean = false;
  constructor(private monacoService: MonacoEditorService) { }

  ngOnInit() {
    this.monacoService.initMonaco().then(() => {
      // Load Java language support extension
      (window as any).require(['vs/language/java/monaco.contribution'], () => {
        monaco.languages.register({
          id: 'java',
          extensions: ['.java'],
          aliases: ['Java', 'java'],
          mimetypes: ['text/x-java-source'],
        });
      });

      // Load C++ language support extension
      (window as any).require(['vs/language/cpp/monaco.contribution'], () => {
        monaco.languages.register({
          id: 'cpp',
          extensions: ['.cpp', '.h'],
          aliases: ['C++', 'cpp'],
          mimetypes: ['text/x-c++src', 'text/x-c++hdr'],
        });
      });

      // Create the editor with both Java and C++ support
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: this.getInitialCode(),
        language: this.selectedLanguage, // Set the initial language
        theme: this.selectedTheme, // Set the initial theme
      });
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  onLanguageChange() {
    if (this.editor) {
      this.editor.dispose();
    }

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.getInitialCode(),
      language: this.selectedLanguage,
      theme: this.selectedTheme,
    });
  }

  onThemeChange() {
    if (this.editor) {
      monaco.editor.setTheme(this.selectedTheme);
    }
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;

    if (this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    // Trigger layout adjustment after entering/exiting full screen
    this.editor.layout();
  }

  exitFullScreen() {
    this.isFullScreen = false;
    document.exitFullscreen();

    // Trigger layout adjustment after exiting full screen
    this.editor.layout();
  }

  getInitialCode(): string {
    if (this.selectedLanguage === 'java') {
      return '// Java code here...';
    } else if (this.selectedLanguage === 'cpp') {
      return '// C++ code here...';
    } else {
      return '// Default code...';
    }
  }
}
