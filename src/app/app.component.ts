import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Angular Component Interaction';
  imgUrl = 'https://picsum.photos/200';
  count = 0;
  name: string;
  userName: string;
  private _customerName: string;

  get customerName(): string {
    return this._customerName
  }

  set customerName(value: string) {
    this._customerName = value;
    if (value === 'Rani') {
      alert('Hello Rani!')
    }
  }

  incrementCount() {
    this.count += 1;
  }

  greetRani(updatedValue) {
    this.userName = updatedValue;
    if (updatedValue === 'Rani') {
      alert('Welcome back Rani!')
    }
  }

}
