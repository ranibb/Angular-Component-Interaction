# Angular Component Interaction

We are going to take a closer look at the interactions that happen within the same component, that is between the component class and the component template. 

We will start with binding. After that, we will see how to intercept the communication between the class and the template to perform some operations. We have two techniques for that:

* The split two-way binding syntax.
* Getters and Setters

We will also learn how the component class can get hold of a Dom element in the template using the view child decorator.

## Binding

How angular makes it possible to push data values into the HTML controls and turn user responses into actions and value updates?

To handle such a push and pull logic, angular provide four forms of binding, each form has a binding to the DOM, from the DOM or in both directions:

* Interpolation `{{…}}`: A one-way data binding from the component class to the template.
* Property Binding `[…]`: A one-way data binding from the component class to a property of an html element.
* Event Binding `(…)`: A one-way data binding from the html template to the component class. With event binding we can execute handlers on user interactions.
* Two-Way Binding `[(…)]`: A two-way binding that combines property and event binding in a single notation. This form of binding ensures that the model and the view are always in sync.

Therefore, Binding is a basic form of interaction between the component class and it's corresponding template.

## The split Two-Way binding

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