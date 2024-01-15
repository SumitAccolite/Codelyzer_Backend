// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'trial2';
// }

//-------------------------------------------

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CodeLyser';
  leftWidth = 200; // Initial width for the left div
  rightWidth = 1000;
  resizing = false;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.resizing) {
      this.resize(event.clientX);
    }
  }
  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.resizing = false;
  }

  startResizing(event: MouseEvent): void {
    event.preventDefault();
    this.resizing = true;
  }
  private resize(clientX: number): void {
    this.leftWidth = clientX;
  }
}
