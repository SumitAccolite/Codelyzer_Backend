// monaco-editor.service.ts

import { Injectable } from '@angular/core';
import * as monaco from 'monaco-editor';

@Injectable({
  providedIn: 'root',
})
export class MonacoEditorService {
  initMonaco() {
    return new Promise<void>((resolve) => {
      if ((window as any).monaco) {
        resolve();
        return;
      }

      const onGotAmdLoader = () => {
        (window as any).require.config({ paths: { 'vs': 'assets/monaco-editor/min/vs' } });
        (window as any).require(['vs/editor/editor.main'], () => {
          resolve();
        });
      };

      if (!(window as any).require) {
        const loaderScript = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = 'assets/monaco-editor/min/vs/loader.js';
        loaderScript.onload = onGotAmdLoader;
        document.body.appendChild(loaderScript);
      } else {
        onGotAmdLoader();
      }
    });
  }

  createEditor(container: HTMLElement, language: string, content: string): monaco.editor.IStandaloneCodeEditor {
    return monaco.editor.create(container, {
      value: content,
      language: language,
      automaticLayout: true,
      readOnly: false,
    });
  }
  
}
