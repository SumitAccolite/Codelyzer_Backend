import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloService } from './hello.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExplorerComponent } from './explorer/explorer.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { MonacoEnvironmentService } from './monaco-environment.service';

@NgModule({
  declarations: [AppComponent, ExplorerComponent, FileViewerComponent, MonacoEditorComponent],
  imports: [ MonacoEditorModule.forRoot(), FormsModule
    ,BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MonacoEnvironmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
