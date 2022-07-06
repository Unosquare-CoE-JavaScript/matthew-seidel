// function Logger(logString: string) {
//   return function (target: Function) {
//     console.log(logString);
//     console.log(target);
//   };
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log("constructor");
                console.log("rendering template");
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = _this.name;
                }
                return _this;
            }
            return class_1;
        }(target));
    };
}
// // @Logger("Logging - App")
var Person = /** @class */ (function () {
    function Person() {
        this.name = "Matt";
        console.log("constructor");
    }
    Person = __decorate([
        WithTemplate("<h1>My App</h1>", "app")
    ], Person);
    return Person;
}());
// const person = new Person();
// console.log(person);
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
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._prince = p;
    }
    Product.prototype.getPriceWithTax = function (tax) {
        return this._price * tax;
    };
    Object.defineProperty(Product.prototype, "_price", {
        get: function () {
            return this._prince;
        },
        set: function (p) {
            if (p > 0)
                throw new Error("Invalid price");
            this._prince = p;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Log
    ], Product.prototype, "title");
    __decorate([
        Log3,
        __param(0, log4)
    ], Product.prototype, "getPriceWithTax");
    __decorate([
        Log2
    ], Product.prototype, "_price");
    return Product;
}());
var Print = /** @class */ (function () {
    function Print() {
        this.message = "Hello World";
    }
    Print.prototype.printMessage = function () {
        console.log(this.message);
    };
    __decorate([
        AutoBind
    ], Print.prototype, "printMessage");
    return Print;
}());
function AutoBind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            return originalMethod.bind(this);
        }
    };
    return adjustedDescriptor;
}
var p = new Print();
var registerValidators = {};
function Required(target, propName) {
    var _a;
    registerValidators[target.constructor.name] = (_a = {},
        _a[propName] = ["required"],
        _a);
}
function PositiveNumber(target, propName) {
    var _a;
    registerValidators[target.constructor.name] = (_a = {},
        _a[propName] = ["positiveNumber"],
        _a);
}
function Validate(obj) {
    var objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (var prop in objValidatorConfig) {
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
            switch (validator) {
                case "required":
                    return !!obj[prop];
                case "positiveNumber":
                    return obj[prop] > 0;
            }
        }
    }
    return true;
}
var button = document.querySelector("button");
button.addEventListener("click", function () {
    console.log(p.message);
});
var Course = /** @class */ (function () {
    function Course(title, price) {
        this.title = title;
        this.price = price;
    }
    return Course;
}());
var courseForm = document.querySelector("form");
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var titleEl = document.getElementById("title");
    var priceEl = document.getElementById("price");
    var title = titleEl.value;
    var price = +priceEl.value;
    var course = new Course(title, price);
    if (!Validate(course)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(course);
});
