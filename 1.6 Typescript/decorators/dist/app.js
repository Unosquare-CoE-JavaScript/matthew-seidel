"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function WithTemplate(template, hookId) {
    return function (target) {
        return class extends target {
            constructor(..._) {
                super();
                console.log("constructor");
                console.log("rendering template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Matt";
        console.log("constructor");
    }
};
Person = __decorate([
    WithTemplate("<h1>My App</h1>", "app")
], Person);
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._prince = p;
    }
    getPriceWithTax(tax) {
        return this._price * tax;
    }
    get _price() {
        return this._prince;
    }
    set _price(p) {
        if (p > 0)
            throw new Error("Invalid price");
        this._prince = p;
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log3,
    __param(0, log4)
], Product.prototype, "getPriceWithTax", null);
__decorate([
    Log2
], Product.prototype, "_price", null);
class Print {
    constructor() {
        this.message = "Hello World";
    }
    printMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Print.prototype, "printMessage", null);
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };
    return adjustedDescriptor;
}
const p = new Print();
const registerValidators = {};
function Required(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ["required"] });
}
function PositiveNumber(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ["positiveNumber"] });
}
function Validate(obj) {
    const objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                case "positiveNumber":
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}
const button = document.querySelector("button");
button.addEventListener("click", () => {
    console.log(p.message);
});
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const course = new Course(title, price);
    if (Validate(course)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(course);
});
//# sourceMappingURL=app.js.map