import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDescriptionComponent } from './file-description/file-description.component';
import { HttpClientModule } from '@angular/common/http';
import { FileDescriptionServiceService } from './file-description-service.service';

@NgModule({
  declarations: [
    AppComponent,
    FileDescriptionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    FileDescriptionServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
