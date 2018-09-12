import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  pageTitle = 'Angular Component Interaction';
  imgUrl = 'https://picsum.photos/200';
  count = 0;
  name: string;
  userName: string;
  private _customerName: string;
  
  @ViewChild('nameRef')
  nameElementRef: ElementRef;

  @ViewChild('el')
  el: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.nameElementRef.nativeElement.focus();
    console.log(this.nameElementRef);

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '<h1>Hello world</h1>');
    console.log(this.el);
  }

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
