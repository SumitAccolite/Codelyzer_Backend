// src/app/monaco-editor/monaco-environment.service.ts

import { Injectable } from '@angular/core';
import * as monaco from 'monaco-editor';

@Injectable({
  providedIn: 'root',
})
export class MonacoEnvironmentService {
  configureMonacoEnvironment(): Promise<typeof monaco> {
    return new Promise<typeof monaco>((resolve) => {
      // @ts-ignore
      self.MonacoEnvironment = {
        getWorker: function (workerId: string, label: string) {
          const getWorkerModule = (moduleUrl: string, label: string): Worker => {
            // @ts-ignore
            return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
              name: label,
              type: 'module',
            });
          };

          switch (label) {
            case 'json':
              return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
            case 'css':
            case 'scss':
            case 'less':
              return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
            case 'html':
            case 'handlebars':
            case 'razor':
              return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
            case 'typescript':
            case 'javascript':
              return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
            default:
              return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
          }
        },
      };

      import('monaco-editor').then((monaco) => {
        console.log('Monaco environment configured', monaco);
  
        // Additional logs for editor creation
        const editorContainer = document.createElement('div');
        document.body.appendChild(editorContainer);
  
        const editor = monaco.editor.create(editorContainer, {
          value: 'Initial content',
          language: 'plaintext',
        });
  
        console.log('Monaco Editor created:', editor);
  
        resolve(monaco);
      });
    });
  
    
  }
}
