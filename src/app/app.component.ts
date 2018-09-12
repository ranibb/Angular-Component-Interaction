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
