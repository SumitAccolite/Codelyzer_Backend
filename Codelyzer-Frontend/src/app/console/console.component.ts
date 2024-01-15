import { Component } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent {

  testcases:string[] = ['TastCase 1', 'TastCase 2', 'TastCase 3','TastCase 4','TastCase 5','TastCase 6','TastCase 7','TastCase 8','TastCase 9','TastCase 10'];
  matched:boolean[] = [true,true,true,false,true,true,true,true,false,true];
  customInput: string = '';
  customOutput: string = '';

  runCustomTestcase() {
    // Implement your custom testcase logic here
    // For example, you might want to process the custom input and update the output
    this.customOutput = `Output for custom input: ${this.customInput}`;
  }
}
