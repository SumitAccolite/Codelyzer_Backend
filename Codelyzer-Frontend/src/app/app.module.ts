import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { FormsModule } from '@angular/forms';
import { QuestionListComponent } from './question-list/question-list.component';
import { ConsoleComponent } from './console/console.component';
@NgModule({
  declarations: [
    AppComponent,
    MonacoEditorComponent,
    HeaderComponent,
    QuestionListComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,

    FormsModule
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
