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