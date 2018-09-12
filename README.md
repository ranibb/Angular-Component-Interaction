# Angular Component Interaction

We are going to take a closer look at the interactions that happen within the same component, that is between the component class and the component template. 

We will start with binding. After that, we will see how to intercept the communication between the class and the template to perform some operations. We have two techniques for that:

* The split two-way binding syntax.
* Getters and Setters

We will also learn how the component class can get hold of a Dom element in the template using the view child decorator.

## Interaction within a component

### Binding

How angular makes it possible to push data values into the HTML controls and turn user responses into actions and value updates?

To handle such a push and pull logic, angular provide four forms of binding, each form has a binding to the DOM, from the DOM or in both directions:

* Interpolation `{{…}}`: A one-way data binding from the component class to the template.
* Property Binding `[…]`: A one-way data binding from the component class to a property of an html element.
* Event Binding `(…)`: A one-way data binding from the html template to the component class. With event binding we can execute handlers on user interactions.
* Two-Way Binding `[(…)]`: A two-way binding that combines property and event binding in a single notation. This form of binding ensures that the model and the view are always in sync.

Therefore, Binding is a basic form of interaction between the component class and it's corresponding template.

### The split Two-Way binding

Sometimes when the template and the component interact, we might want to execute a few additional lines of code. 

let’s say we have an input element where we need to constantly keep track of its value and submit it to the server when required. For that purpose alone, we use Two-Way binding. But now in addition to storing the updated value, whenever the input value changes, we also want to execute few lines of code. This is not possible with the banana in a box two-way binding syntax. To achieve this, We need to split the two-way binding syntax into separate property binding and event binding. 

For example, whenever the input's value equals "Rani", an alert message should pop up displaying the message "Welcome back Rani". To achieve that we need to split the two-way binding syntax:

First, create a property binding with the ngModel directive and the userName property, so just the square brackets. Second, add event handling with the ngModelChange event.

```HTML
<input [ngModel]="userName" (ngModelChange)="userName=$event" type="text">
```

Where $event refers to the updated value of the input element. we assign it back to the userName property, thus achieving two-way binding.

Finaly, to execute additional lines of code, instead of assigning the updated value `"userName=$event"`, we can specify a method name and passing the updated value as an argumnet `greetRani($event)`.

```HTML
<input [ngModel]="userName" (ngModelChange)="greetRani($event)" type="text">
```

### Getters and Setters

As an alternative to splitting the syntax, we also have Getters and Setters.

Let's take the same example, whenever the input's value equals "Rani", an alert message should pop up displaying the message "Welcome back Rani". To achieve that using Getters and Setters, we begin by making the property private.

```TypeScript
private _customerName: string;
```

Next, we create the getter for this property. A getter is nothing but a function that returns the private property.

```TypeScript
get customerName(): string {
    return this._customerName
}
```

similarly, we create the setter for this property, A setter is nothing but a function that accepts a value and assigns the passed in value to the private property. And while setting the value, we can execute the additional code we wish to.

```TypeScript
set customerName(value: string) {
    this._customerName = value;
    if (value === 'Rani') {
        alert('Hello Rani!')
    }
}
```

Note that what we are binding to ngModel here is the getter and setter functions, not the private property.

### ViewChild Decorator

How to access a DOM element in the template from the component class? Let's say, on page load we want to set the focus on the name input element. To do that we need to use the ViewChild decorator.

First, attach a template reference variable to the input element.

```HMTL
<input #nameRef [(ngModel)]="name" type="text">
```

Second, create a property of type ElementRef that will hold a reference to this DOM element. Also, make sure to import ElementRef from '@angular/core'.

```TypeScript
export class AppComponent {
    //..
    nameElementRef: ElementRef;
    //..
}
```

Third, we need to tell this property which DOM element it has to reference. And for that, we make use of the viewChild decorator, specifying the template reference variable. Also make sure to import ViewChild from '@angular/core'.

```TypeScript
export class AppComponent {
    //..
    @ViewChild('nameRef')
    nameElementRef: ElementRef;
    //..
}
```

Note: if we want to write component initialization code that uses the reference injected by this viewChild decorator, we need to do it inside the ngAfterViewinit lifecycle hook. It is inside that lifecycle the references to DOM elements become available.

So, Fourth, let's implement the AfterViewInit lifecycle hook and make sure to import it from '@angular/core'. And then let's define the ngAfterViewInit method

```TypeScript
export class AppComponent {
    //..
    @ViewChild('nameRef') nameElementRef: ElementRef;

    ngAfterViewInit() {
        this.nameElementRef.nativeElement.focus();
    }
    //..
}
```
`this.nameElementRef` is like a wrapper around the actual DOM element. So we need to go a step further and access the `nativeElement` property and then call the `focus()` method. You can do further exploration by logging to the console.

```TypeScript
console.log(this.nameElementRef);
```

You can see that we have the nativeElement property. Expand it and you can see all the DOM element properties and methods. So, you can either alter the property values or call the methods to meet your requirements.

## Interaction between different components e.g. Parent and Child

### Input Decorator

Send data to a child component from the parent component.

First let's generate a child component and specify the selector in app component template.

A possible case: Several components make use of the loggedIn state. Rather than each component marinating its own logged in value, a single parent component maintains that value and passes it on as an input to the children components. To make this interaction of the parent component passing data to the child component possible, we make use of input decorators.

### Getters and Setters

Intercept a change in the @input property value and perform some operation.

Instead of having two lines of code to display the appropriate message "Welcome back!" and "Please log in.", create a single property and assign the appropriate value. To do that we need to intercept the value passed in from the parent component to the child component.

We have already seen a way to intercept property change where we used two-way binding split syntax with getters and setters. Now are going to use only getters and setters.

As seen before, the setter makes it possible to intercept the value change and execute additional lines of code.

So, whenever the @input value of loggedIn changes we intercept the change and set the appropriate message. So, based on the value that is passed in you can execute any logic and assign values to any properties in the component.

### ngOnChanges

Another approach to intercept the change in an @input property value is using the ngOnChanges of the onChanges lifecycle hook.

To be able to use the ngOnChanges method, the component has to implement the onChanges lifecycle hook interface.

Angular calls the ngOnChanges method whenever it detects changes to @input properties of the component.

```TypeScript
ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
}
```

You can see in the console that the changes object that is of type SimpleChanges has three properties:
* previousValue: is the value of the input property before the change
* currentValue: is the value of the input property after the change
* firstChange: is a boolean value that indicates if the change was for the very first time or not.

In our example, you can see that the currentValue is set to true. That value is passed from the parent component to the child component. firstChange is also set to true which means to say that the input property value changed for the very first time. And the previous value is undefined because we didn't set a default value.

If you click on the logout button, observe the new object that has been logged to the console again with updated values. However, if you click again on the logout button, the object is not logged in the console because there was never a change in the input property value. Click on the login button and the object gets logged in the console.

To set the appropriate message we can make use of these properties.

So, you can either use getters and setters or ngOnChanges method to intercept @input property values and execute any custom logic necessary for your application. 

*But when to use one over the other?*

* ngOnChanges only working with child components.

* It is recommended to use getters and setters when there is only one @input property.

* If there are a lot of @input properties that you have to keep track of, then ngOnChanges is better as it is less lines of code compared to getters and setters. Also, with ngOnChanges we get access to these useful properties of the SimpleChanges object:
    * You can make use of firstChange property to execute logic only the first time the value changes.
    * You can also use the previousValue property to execute logic only when the value changes from a specific value.

Summery, so far in the interaction with a child component, we have seen how the parent component can pass on data to the child component and at the same time, how the child component can intercept the change in that @input property value. Next let's see how the parent component can directly access properties and methods of the child component.

### Template Reference Variables

A lot of times when you have nested components, you are going to want to access the properties and methods directly in the parent component. And the way we do that is using Template Reference Variables.

But what if you want to access the properties and methods in the parent component class instead? for that we will have to make use of the ViewChild decorator which we have seen earlier.