import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {

  @Input() loggedIn: boolean;
  message: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const loggedInValue = changes['loggedIn'];
    if (loggedInValue.currentValue == true) {
      this.message = "Welcome back";
    } else {
      this.message = "Please log in.";
    }
  }

}
