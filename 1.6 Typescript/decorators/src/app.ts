// function Logger(logString: string) {
//   return function (target: Function) {
//     console.log(logString);
//     console.log(target);
//   };
// }

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    target: T
  ) {
    return class extends target {
      constructor(..._: any[]) {
        super();
        console.log("constructor");
        console.log("rendering template");
        const hookEl = document.getElementById(hookId) as HTMLDivElement;
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// // @Logger("Logging - App")
@WithTemplate("<h1>My App</h1>", "app")
class Person {
  name = "Matt";
  constructor() {
    console.log("constructor");
  }
}

// const person = new Person();

// console.log(person);

function Log(target: any, propertyName: string | symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function log4(target: any, name: string | symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _prince: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._prince = p;
  }
  @Log3
  getPriceWithTax(@log4 tax: number): number {
    return this._price * tax;
  }
  get _price(): number {
    return this._prince;
  }
  @Log2
  set _price(p: number) {
    if (p > 0) throw new Error("Invalid price");
    this._prince = p;
  }
}

class Print {
  message = "Hello World";
  @AutoBind
  printMessage() {
    console.log(this.message);
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjustedDescriptor;
}

const p = new Print();

interface ValidatorConfig {
  [property: string]: {
    [validatorName: string]: string[];
  };
}
const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
      ...registerValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ["positiveNumber"],
  };
}

function Validate(obj: any) {
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
button!.addEventListener("click", () => {
  console.log(p.message);
});

class Course {
  constructor(public title: string, public price: number) {}
}

const courseForm = document.querySelector("form") as HTMLFormElement;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;
  const course = new Course(title, price);
  if (Validate(course)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(course);
});
