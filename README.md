# What is scope?
we tipically think thata JS is calssified as an interpreted scripting lenguage, so it is assumed by most that JS program are prodessed in a single, top-down pass. But in fact is parsed/compiled in a separated phase before execution begins.


JS functions are themselves first-class values; they can be assigned and passed around just like numbers or strings/ B ut since these functions hjold and access vcariables,. the maintain original scope no matther where in the program the functions are eventually executed. This is called clousure.

Scope gives meaning to variables futhermore, determines the set of variables that can be accessed by a line of code

## Abstract Syntax Tree AST 

taking a stream (array) of tokens and turning it into a tree of nested elements, whick collectively represent the grammatical structur of the program. This is called an abstract syntax tree (AST)

## COMPILER SPEAK

### *LHS*
left-hand side or aka Target. It is the left part in a ***=***

### *RHS*
right-hand side or aka source. It is the rigth part in a ***=***

taking this simple js code to analkkysis

```
var students = [
    { id: 1, name: "bruce", age: 40 },
    { id: 2, name: "zoidberg", age: 22 },
    { id: 3, name: "alex", age: 22 },
    { id: 4, name: "daniel", age: 30 }
];
function getStudentName(studentID) {
    for (let student of students) {
        if (student.id === studentID) {
            return student.name;
        }
    }
}
var nextStundet = getStudentName(2);

console.log(nextStundet);
//zoidberg
```

### target
what makes a variable a target?

`students = [ `

this statement is clearly an assignment operation; considere the *var students* part is handled entirely as a declaration at compile time, and is thuys irrelevant during execution, we left it out for clarity and focus. Samen with the *nextStudent = getStudentdName(2)*

but there are three other target assignment operations in the code that are perhaps less obviuos. One of then

`for (let student of students) {`

that statment assigns a value to student for each iteraction of the loop.

Other *target* reference

`getStundentName(2);`

the argument *2* is assigned to the parameter studentID

and last *target* reference

# Lexical scope
the scope of each variable is determined by reading the code without having to execute it, this is why is know also as static scope.

## Marbles, and buckets, and bubbles... oh my
one usefull metaphor found effective in undertanding scope is sorting colored marbles into buckets of ther matching color.

If you try sorting a pile of marbles dropping the red ones into a red bucket, blue ones into a blue bucket. After sorting when you need a red marble you already know the red bucket is where to got to get it.

in this metaphor the marbles are the variables and the buckets are the scopes 

```
//global scope: RED
var students = [
    { id: 1, name: "bruce", age: 40 },
    { id: 2, name: "zoidberg", age: 22 },
    { id: 3, name: "alex", age: 22 },
    { id: 4, name: "daniel", age: 30 }
];
function getStudentName(studentID) {
    //function scope: BLUE
    for (let student of students) {
        //loop scope: green
        if (student.id === studentID) {
            return student.name;
        }
    }
}
var nextStundet = getStudentName(2);

console.log(nextStundet);
```

## Nested scope
in Javascript the sopces are created by code blocks, functions and modules. these scopes can be nested inside an inner scope you can access the variables of an outher scope

## Global error reference
is important allways declare the variable, sice javascript if strict mode is not enabled and your are trying invoke a variable javascript will create it and then assign the value, this almost certain to lead to bogs eventually.

never rely on accidental global variables. Allways use strict-mode

# The Scope Chain
the connection between scopes tha are nested within others scopes is called the scope chain, which determines the path along which variables can be accessed.
## lookup is mostly conceptual
lookup is the engi8ne has to start by asking the current scope scope's manager if it know about identifier/variaable, and proceeding upward/outward back throughn the chain of nested scopes (toward the global scope) until found, if ever.The lookup stops as son as the first matching named declaration in a scope bucket is found

# Global Scope

the vast majority of work is now inside of functions and modules rather than globally.

the global scope of JS program is a rich topic, wich much more utility and nuance than you would likely assume 

## browser-executed applications
with repect to browser-executed applications, there are three main ways.

1. if you're directly using ES modules, thes files are loaded indivually by the JS enviroment. Each module then imports references to whichever other modules it needs to access. The separate module files cooperate with eac other exclusively through these shared imports, without needing to any shared outer scope.
2. if you're using a bundler in your build process, all files are typically concatenated toghether before delivery to the browser and JS engine, which then only processes one big file. Even with all the pieces of the application co-located in a single file, som mechanism is necessary for each piece to  register name to be referred to by other pieces, as well as some facility for that access to occur.
In some build setups, the entire content of the file are wrapped in a single enclosing scope, such as a wrapper function, universal modul (UMD), etc. Each piece can register itself for access from other pieces by way of local variables in that shared scope
```
(function wrappingOuterScope(){
    var moduleOne= (function one(){
        // ..
    })
    var moduleTwo = (function two(){
        // ..
        function callModuleOne(){
            moduleOne.someMethod();
        }
        // ..
    })
})
```
As shown, the moduleOne and moduleTwo local variables inside the wrappingOuterScop() function scop are declared so that these modules can access each other for their cooperation

3. whether a bundler tool is used for an application, or whether the (non-ES module)files are simply loaded in the browser individually (via <script/ > tags or other dynamic JS resource loading), if there is no single surrounding scope encompassing all these pieces, the global scop is the only way fopr them to cooperate with each other
it would see like this.
```
var moduleOne = (function one(){
    // ..
})();
var moduleTwo = (function two(){
    // ..
    function callModuleOne(){
        moduleOne.someMethod();
    }
})();
```
Here, since there is no surrounding function scope, these moduleOne and moduleTwo declaration are simply dropped into the global scope

## Where exactly is the Global Scope?
It might seem obvious that the global scop is located in the outermost portion of a file; that is, not inside any function or other block. But it's not as simple as that

### Browser "Window"
With respec to to treatment of the global scope, the most *pure* environment JS can be run in is as a standalone .js file loaded in a web page environment in a browser.
consider this file
```
var studentName = "Kyle"

function hello(){
    console.log(`Hello, ${stundentName}!`);
}
hello();
```
this code may be loaded in a web page environment using an inline <script/ > tag, a <script src=.. / > script tag in the markup, or even a dynamically created <script .> DOM element. In all three cases, the stundentName and hello identifiers are declared in the global scope.

that's the default behavior onw would expect from a reading of the JS specification: the outer scope *is* the global scope.

that's what i mean by *pure*. But unfortunately, that won't always be true for all JS environment you encounter, and that's often surprising to JS developers

### Globals Shadowing Globals

An usual consequence of the difference between a global variable and global property of the same name is that a, within just the global scop itself, a global property can be shadowed by a global variable.

```
window.something = 42

let something = "Matthew";

console.log(something);
// Matthew

console.log(window.something);
// 42
```
the let declaration adds a something global variable but not a global object property. 

### Dom Globals
I asserted that a a browser-hosted JS environment has the most pure global scope behavior we'll see. However, it's not entirely pure.

One surprising behavior ing global scope you may encounter with browser-based JS applications: a DOM element with an id attribute automatically creates a global variable that references it.

```
<ul id="my-todo-list">
    <li id="first" > Write a markdown </li>
    ..
</ul>
```

and the JS for that page could include

```
first;
//<li id="first">..</li>

window["my-todo-list"]
// <ul id="my-todo-list">..</ul>
```

if the id value is a valid lexical name (like *first*), the lexical variable is created. If not, the only way to access that a is through the global object (window[..])

### what's in a (window) name?
Another global scop iddity in browser-based JS:

```
var name = 42;

console.log(name, typeof name);
// "42" string
```

window.name is pre-defined "global" in a browser context; it's a property on global object, so it seems like a normal variable.

## Web Workers
Web workers are wa web platform extension on top of browser-JS behavior, which allows a JS fil to run in a completely separate thread (operating system wise) from the thread that's running the main JS program.

since these Web Workers programs run on a separated thread, they're restricted in their communications with the main applications thread, to avoid/limit race conditions and other complications. Web Worker code does not have access to the DOM, for example.

Since a Web Worker is treated as a wholly separated program, it does not share global scope with the main JS program.

```
var studentName = "Matthew"
let studentID = 42;

function hello(){
    console.log(`hello, ${self.studentName}`)
}

self.hello()
// hello, Matthew
self.studentId;
//undefined
```
Just as with main JS programs, var and function declarations create mirrored properties on the global object (aka, self), where other declarations (let, etc), do not

## Node
One aspect of Node that often catches JS developers off-guard is that a Node treat every single .js file that it loads, including the main one you start the Node process with, as a module. The practical effect is that the top level of your Node programs is never actually the global scope, the way it is when loading a non-module file in the browser

Node has support for ES modules. But additionally, node ahs from its beginning supported a module format referred to as "CommonJS", which looks like this:

```
var studentName = "Matthew"
function hello(){
    console.log(`hello, ${studentName}`)
}

hello()

module.exports.hello = hello
```

Before processing, Node effectively wraps such code in a function, so that the var and function declarations are contained in thata wrapping function's scope, not treated as global variables
Envision the preceding code as begin seen by Node as this (illustrative, not actual)

```
function Module(module, require, __dirname,...){
    var studentName = "Matthew"
    function hello(){
        console.log(`Hello, ${studentName}`);
    }
    hello();
    //Hello, Matthew

    module.exports.hello = hello
}
```

## Global This
Review the JS environments we've looked at so far, a program may or may not:

- Declare a global variable in the top-level scope with var or function declarations-or let,const and class
- Also add global variables declarations as properties of the global scope object if var or function are used for the declaration
- Refer to the global scope object (for adding or retrieving global variables, as properties) with window, self or global

other "trick" for obtaining a reference to the global scope object looks like

```
const theGlobalScopeObject =
 (new Function("return this"))();
```

> ## Note
> A function can be Dynamically constructed from code stored in a string value with the Function() constructor, similar to eval(..). Such a function will automatically be run in no-strict-mode (for legacy reasons) when invoked with the normal() function invocation as shown; its this will point at the global object. See the third book in the series, Object & Classes,, for more information on determining this bindings

We could even attempt to define a cross-environment polyfill that's safer across pre-globalThis JS environment, such as:

```
const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
    (typeof global != "undefined") ? global :
    (typeof window != "undefined") ? window:
    (typeof self != "undefined") ? self:
    (new Function("return this"))();
```
That's certainly not ideal, but it works if you find yourself needing a readably global scope reference.

# The (not so) secret lifecycle of variables
Just knowing which scop a variable comes from is only a part of the story. If a variable declaration appears past the first statement of a scope, how will any references to that identifier *before* the declaration behave? what happens if you try to declare the same variable twice in a scope?

## When can i use a Variable?
At what point does a variable become available to use within its scope?

Consider:

```
greeting();
//hello!

function greeting(){
    console.log("hello!");
}
```
This code works fine. You may have seen or even written code like it before. But you ever wonder how or why it works? Specifically, why can you access the identifier greeting from line 1, even though the greeting() function declaration doesn't occur until line 4?

The term mos commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called **hoisting**. But hoisting alone doesn't fully answer the question.

When a function declaration's name identifier is registered at the top of its scope, it's additionally auto-initialized to that function's reference. That's why the function can be called throughout the entire scope

## Hoisting: Declaration vs. Expression
Function hoisting only applies to formal function declarations, not to function expression assignments Consider:

```
greeting();
// TypeError

var greeting = function greeting(){
    console.log("Hello!")
};
```
Line 1 (greeting()) throws an error. But the kind of error thrown is very important to notice. A type error means we're trying to do something with a value that is not allowed. Depending on your JS environment, the error message would say something like "'undefined' is not a function" or more helpfully, "'greeting' is not a function".

Variables declared with var are also automatically initialized to undefined at the beginning of their scope-again, the nearest enclosing function, or the global. Once initialized, they're available to be used throughout the whole scope.

The name of the identified is hoisted. But the function reference association isn't handled at initialization time unless the identifier was created in a normal function declaration.

## Variable Hoisting
let's look another example of *variable hoisting*
```
greeting = "hello!"
console.log(greeting);
//hello

var greeting = "Howdy!"
```
though greeting isn't declared until line 5, it's available to be assigned to as early line 1. Why?

There's two necessary parts to the explanation:

-The identifier is hoisted

-**and** it's automatically initialized to the value undefined from the top of the scope

## Hoisting: Yet another Metaphor
The typical assertion of what hoisting means: *lifting*--like lifting a heavy weight upward-- any identifiers all the way to the top of a scope. The explanation ofter asserted is that the JS engin will actually rewrite that program before execution, so that it looks more like this.

```
var greeting;           // hoisted declaration
greeting ="hello!"      // the original line 1
console.log(greeting)   // Hello!
greeting = "Howdy!"     // `var` is gone!
```
The hoisting (metaphor) proposes that JS pre-processes the original program and re-arranges it a bit, so that all the declarations have to been moved to the top of their respective scopes, before execution. Moreover, the hoisting metaphor asserts that function declarations are, in their entirety, hoisted to the top of each scope

```
studentName = "Suzy"
greeting();
// hello Suzy
function greeting(){
    console.log(`Hello ${studentName}!`)
}
var studentName
```

the "rule" iof the hoisting metaphor is that function declarations are hoisted first, then variables are hoisted immediately after all the functions. Thus, the hoisting story suggest that program is re-arranged by the JS engine to look like this

```
function greeting(){
    console.log(`Hello ${studentName}!`)
}
var studentName;

studentName = 'Suzy'
greeting();
// Hello Suzy!
```

## Re-declaration?
what do you think when a variable is declared mor than once in the same scope? Consider.

```
var studentName = "Frank"
console.log(studentName);
//Frank

var studentName;
console.log(studentName) // ???
```

What do you expect to be printed for that second message? Many believe the second var studentName has re-declared the variable (and thus "reset" it), so they expect undefined to be printed

but is there such a thing as a variable being "re-declared" in the same scope? No.

If consider this program from the perspective of the hoisting metaphor, the code would be re-arranged like this:

```
var studentName
var studentName             // clearly a pointless no-op

studentName = "frank"
console.log(studentName);   // Frank
console.log(studentName)    // Frank
```

## constants?
the const keyword is more constrained than let. Like let, const cannot be repeated with the same identifier in the same scope. but there's actually an overriding technical reason why that sort of "re-declaration" is disallowed, unlike let which disallows "re-declaration" mostly for stylistic reasons.

The const keyword requires a variable to be initialized, so omitting an assignment from the declaration result in a SyntaxError

```
const empty; //syntax error
```
const declarations create variables that con not be reassigned

```
const studentName = "Matt"
console.log(studentName)
// Matt

studentName = "Suzy"; // TypeError
```

## Loops
So it's clear from our previous discussion that JS doesn't really want us to "re-declare" our variables within the same scope.

That probably seems like a straightforward admonition,until you consider what it means for repeated execution of declarations statements in loops. Consider

```
var keepGoing = true;
while (keepGoing){
    let value = Math.random();
    if(value > 0.5){
        keepGoing = false
    }
}
```

Is value being "re-declared" repeatedly  in this program? Will we get errors thrown? No.

All the rules of scope (including "re-declaration" of let created variables) are applied *per scope instance*. In other words, each time a scope is entered during execution, everything reset.

Each loop iteration is its own new scope instance, and within each scope instance, and within each instance, value is only being declared once. So there's no attempted "re-declaration", and thus no error. before we consider other loop forms, what if the value declaration in the previous snippet were changed to a var?

```
var keepGoing = true;
while(keepGoing){
    var value = Math.random();
    if(value > 0.5){
        keepGoing = false;
    }
}
```

One way to keep this all straight is to remember that var, let and const keyword are effectively *removed* from the code by the time it starts to execute. They're handled entirely by the compiler

## Uninitialized variables (aka, TDZ)
with var declarations, the variables is "hoisted" to the top of its scope. But it's also automatically initialized to the undefined value, so that the variable can be used throughout the entire scope.

However, let and const declarations are not quite the same in this respect. Consider

```
console.log(studentName)
// referenceError
let studentName = "Suzy";
```
The result of this program is that a referenceError is thrown on the first line. Depending on your JS environment, the error message may say something like: "Can not access studentName before initialization"

so if we analyze what's going on here, we see that an additional nuance is that compiler is also adding an instruction in the middle of the program, at the point where the variable studentNAme was declared, to handle that declaration's auto initialization. We can not use the variable at any point prior to that initialization occurring. The same goes for const as it does for let

the term coined by TC39 to refer to this *period of time* from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ).

the TDZ is the time window where a variable exits but is still uninitialized

But the way, "temporal" in TDZ does indeed refer to *time* not *position in code*. Consider:

```
askQuestion();
// ReferenceError

let studentName = "Suzy"

function askQuestion(){
    console.log(`${studentName}, do you know?`)
}
```
Eve though positionally the console.log(..) referencing studentName comes after the let studentName declaration, timing wise the askQuestion() function is invoked *before* the let statement is encountered, while studentName is still in its TDZ! hence the error

## Finally initialized

Working with variables has much more nuance than it seems at first glance. *Hoisting*, (re)declaration, and the TDZ are common source of confusion for developers, especially those who have worked in other languages before coming to JS. Before moving on, make sure your mental model is fully grounded on these aspect of JS scope and variables.

hoisting is generally cited as an explicit mechanism of the JS engine, but it's really more a metaphor to describe the various ways JS handles variable declarations during compilation. but even as a metaphor, hoisting offers useful structure for thinking about the life-cycle of a variable --when it's created, when it's available to use, when it goes away.

# Limiting scope exposure
So far our focus has been explaining the mechanics of how scopes and variables work. With that foundation now firmly in place, our attention raises to a higher level of thinking: decisions and patterns we apply across the whole program

## Least Exposure
it makes sense that functions define their own scopes. But why do we need blocks to create scopes as well?

Software engineering articulates a fundamental discipline, typically applied to software security called, "the principle of least exposure" (POLP). And a variation of this principle is called "the principle of least privilege" (POLE)

PLOP express a defensive programming principle, which states that the least amount of information should be available to an attacker. this means that each piece is connected with minimum-necessary capabilities, the overall system is stronger from a security standpoint, because a compromise of failure of one piece has a minimized impact of the rest of the system.

If PLOP focuses on system-level component design, the POLE *exposure* variant focuses on a lower level; we'll apply it to how scopes interact with each other.

Im following POLE, what do we want to minimize the exposure of? Simply: the variables registered in each scope.

there are three main hazards that often arise when we try to minimize exposure:

- **Naming collisions**: if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope, then name collision occurs, and it's very likely that bugs will be introduced. For example, imagine if all your loops used a single global i index variable, and then it happens that one loop in a function is running during an iteration of loo9p from another function, and now the shared variable gets an unexpected value.

- **Unexpected behavior**: id you expose variable/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn't intent, which can violate expected behavior and cause bugs.

- **Unintended Dependency**: if you expose a variable/functions unnecessarily, it invites other developers a depend on those otherwise *private* pieces. while that doesn't break your program today, it will create a refactoring hazard in the future, because you can not as easily refactor that variable or function without potentially breaking other parts of the software that you didn't intend to.

POLE, as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keeping everything else private. declare variables in as small and deeply nested of scopes as possible, rather tan placing everything in the global scope.

Consider:

```
function diff(a, b){
    if(a > b){
        let tmp = a;
        a = b;
        b = tmp;
    }
    return b - a;
}

diff(10, 5); // 5
diff(7, 3); // 4
diff(10, 10); // 0
```
In this diff(..) function, we want to ensure that a is greater than b, so that when subtract a-b the result is positive, if not, swap a and b.

## Hiding in plain (functions) Scope
It should now be clear why it's important to limit the exposure of variables and functions in a scope. But how do we do so?

We've already seen the let and const keywords,which are block scope declarations; but what about hiding the var keyword? That can be easily done by using be don by wrapping a function scope around a declaration.

```
var cache = {};

function factorial(n){
    if(n in cache){
        return cache[n];
    }
    if(n <= 1){
        return 1;
    }
    cache[n] = n * factorial(n-1);
    return cache[n];
}
```

we're sorting all the computed factorials in cache so that across multiple calls to factorial, the previous results computations remains. but the cache variable is pretty obviously a private detail of how factorial works, not something that should be exposed in an outer scope -- specially not the global scope.

however, fixing this over-exposure is not a simple as hiding the cache variable inside factorial, as it might seem. Sice we need cache survive multiple calls, it must be located in a scope outside that function. So what can we do?

Define another middle scope (between the outer/global scope and the inside function scope) that will hold the cache.

```
function hideTheCache(){
    var cache = {};
    function factorial(n){
        if(n in cache){
            return cache[n];
        }
        if(n <= 1){
            return 1;
        }
        cache[n] = n * factorial(n-1);
        return cache[n];
    }
    return factorial;
}

var factorial = hideTheCache();

factorial(10); // 3628800
factorial(5); // 120
```

The hideTheCache() function returns a function that is not exposed to the outside world, but it's still a function that can be invoked.

Rather than defining a new and uniquely named function each time on of those scope-only-for-purpose-of-hiding-a-variable situations occurs, a perhaps better solution is to use a function expression:

```
var factorial = (function hideTheCache(){
    var cache = {}
    function factorial(x){
        if(x in cache){
            return cache[x];
        }
        if(x <= 1){
            return 1;
        }
        cache[x] = x * factorial(x-1);
        return cache[x];
    }
    return factorial;
})()'
factorial(6); // 720
factorial(5); // 120
```

Wait This still using a function to create the scope for hiding cache, and in this case, the function is still named hideTheCache, so how does that solve anything?

Recall from "Function Name Scope", what happens to the name identifier from a function expression. Since hideTheCache is defined as a function expression instead of a function declaration, its name is in its own scope-essentially the same scope as cache--rather than in the outer/global scope.

## Invoking Function Expressions Immediately
There's another important bit in the previous factorial recursive program that's easy to miss: the line at the end of the function expression that contains })()

In other words, we're defining a function expression that's then immediately invoked function Expression (IIFE).

An IIFE is useful when we want to create a scope to hide variables/functions. Since it's an expression, it can be used in **any** place in a JS program where an expression is allowed. An IIFE can be named, as with hideTheCache(), or unnamed/anonymous. And it can be standalone, or used as a parameter to another function.

```
// outer scope
(function(){
    // inner scope
})()
// outer scope
```


Unlike earlier with hideTheCache(), where the outer surrounding were noted as being and optional stylistic choice, for a standalone IIFE they're required.

### Functions Boundaries
Beware that using an IIFE to define a scope can have some unintended consequences, depending on the code around it. Becaus IIFE is a full function the function boundary alters the behavior of certain statements/constructs.

For example, if you use an IIFE to define a scope, then you can't use the return keyword to return a value from the IIFE.
So, if you want to return a value from an IIFE, you need to use a named function expression:

```
(function named(){
    return "hello";
})()
```

## Scoping with Blocks
The previous two examples are good examples of how to use IIFEs to hide variables/functions. But what about when you need to hide variables/functions in a block of code?

```
   if(true){
        var x = 1;
        function f(){
            return x;
        }
    }
    f(); // 1
```

So far so good, but what if we want to hide x in the inner scope?

```
    if(true){
        var x = 1;
        function f(){
            var x = 2;
            return x;
        }
    }
    f(); // 2
```

A blok only becomes a scope if necessary, to contain its bloc-scoped declarations. Consider:
```
{
    // Not necessarily a scope (yet)

    // ..
    var x = 1;

    // now we know the block needs to be a scope

    for(var i = 0; i < 10; i++){
        if(i % 2 ==0){
        console.log(i);
        }
    }
}

```

not all the { .. } curly-brace pairs create blocks.

- Object literals use { .. } curly-brace pairs to delimit their key-value lists, but such object values ar not scopes.
- Class uses { .. } curly-brace pairs to delimit their class body, but such class values ar not scopes.
- Function declarations use { .. } curly-brace pairs to delimit their function body, but such function values ar not scopes. it's a single statement.
- The { .. } curly-brace pair on a switch statement is not a block.

Other than such non-block examples, a { .. } curly-brace can define a block attached gto a statement (such as a function declaration, for example).

## var AND let
Next, let's talk about the declaration var buckets. that variable is used across the entire function, Any variable that is needed across all of function should be declared so that such usage is obvious.

So whi did we use var instead of let to declare the buckets variables? there's both semantic and technical reason to choose var over let.

Stylistically, var has always, from the earliest days of JS, signaled "variable that belongs to a whole function". Var attaches the nearest enclosing function scope, no matter where it is declared.

```
function diff(x, y){
    if(x > y){
        var tmp = x; // tmp is function-scoped
        x = y;
        y = tmp;
    }
    return y - x;
}
```

Even though var is inside a block, its declaration is function-scoped, not block-scoped.

why not use let in that case? because var is visually distinct from let therefore signals clearly, "this variable is function-scoped". Using let in the top-level scope, especially if not in the first few lines of function, and when all the other declarations in blocks use let, does not visually draw attention to the difference with the function-scoped declaration.

in other words, i feel var is better communicates function-scoped than let does, and let both communicates block-scoping where var is insufficient.

## Where to let?
My advice to reserve var for (mostly) only a top-level function scope means that most other declarations should use let. But you may still wondering how to decide where eac declaration in your program belongs?

POLE already guides you on those decisions, but let's make suer we explicitly state it. The way to decide is not based on which keyword you want to use. The way to decide is to ask, "what is the most minimal scope exposure that's sufficient for this variable?"

once answered, you'll know if a variable belongs in a block scope or the function scope. If you decide initially that a variable belongs in a block scope, you can use let. If you decide initially that a variable belongs in a function scope, you can use var.

```
function diff(x, y){
    var temp;
    if(x > y){
        tmp = x; 
        x = y;
        y = tmp;
    }
    return y - x;
}
```

## What's the catch?
So far we've asserted that var and parameters are function-scope, and let/const are signal block-scope declarations. There's one little excpetion to call out: the catch clause.

since the introduction of try...catch, back in ES3 (in 1999). the catch clause has used additional (little-known) scoping declaration capability

```
try{
    doesNotExist();
}catch(e){
    console.log(e);
    // ReferenceError: 'doesNotExist' is not defined
    // ^^^^ message printed from the caught exception

    let onlyHere = true;
    var outerVariable = true;
}
```

## Function Declaration in Blocks (FiB)
We've seen how that declarations using let or const are block-scope, and var declaration are function-scope. So what about function declarations that appear directly inside blocks?
As a feature this is called "FiB"

We typically think of function declarations like they're the equivalent of a var declaration. So are they function-scope like var is?

No and yes. I know... that's confusing. let's dig in.


```
if(false){
    function ask()){
        console.log("does this run?");
    }
}
ask();
```

what do you expect for this program to do? Three reasonable outcomes:

1. The ask() might fail with referenceError exception, because the ask identifier is block-scoped to the if block scope an thus isn't available in the outer/scope.
2. The ask() call might fail with a TypeError exception because the ask identifier exists, but it's undefined (since the if statement doesn't run) and thus not callable function
3. the ask() call might run correctly, printing out the "does it run?" message

the JS specification says that function declarations inside of blocks are block-scoped, so the answer should be (1). However, most browser-based JS engines (including v8, which comes from Chrome but is also used in Node) will behave as (2), meaning the identifier is scoped outside the if block but the function value is not automatically initialized, so it remains undefined

One of the most common use causes for placing a function declaration in block it so conditionally define a function one way or another (like with an if..else statement) depending on some evironment state. For example:

```
if (typeof Array.isArray != "undefined"){
    function isArray(a){
        return array.isArray(a);
    }
}else{
    function isArray(a){
        return Object.prototype.toString.call(a) === "[object Array]";
    }
}
```
It's temping to structure code this way for performance reason, since the typeof Array.isArray check is only performed once, as opposed to defining just one isArray and putting the if statement inside it-the check would then run unnecessarily on every call.

In addition to the previous snippets, several other FiB corner cases are lurking; such behaviors in various browsers and non-browsers JS environment (JS engines that aren't browser based) will likely vary. For Example

```
if(true){
    function ask(){
        console.log("does this run?");
    }
}
if (true){
    function ask(){
        console.log("Or what about me?")
    }
}
for(var i = 0; i < 10; i++){
    function ask(){
        console.log("or me?");
    }
}

function ask(){
    console.log("wait, it might me?");
}
```

the message displayed in this snippet would be "wait, it might me?" would hoist above the call to ask(). Since it's the last function declared with that name. But unfortunately, no.

It's not my intention to document all these weird corner cases, nor to try to explain why each of them behaves a certain way. That information is, in my opinion, arcane legacy trivia.

So for the earlier if..else statement my suggestion is to avoid conditionally defining functions if at all possible. Yes it may be slightly less performant, but this is the better overall approach.

## Blocked Over

The point of lexical scoping rules in a programming language is so we can appropriately organize our program's variable both for operational as well semantic code communication purposes.

# Using closures

Up to this point, we've focused on the ins and outs of lexical scope, and how to use it to organize our program's variable.

Our attention again shifts broader in abstraction, to the historically somewhat daunting topic of closure. Don't worry, we'll get to that in a bit.

## See the closure
Closure is originally a mathematical concept, from lambda calculus. But it's a term that's been used in a variety of different contexts, and it's not just a mathematical concept.

But I'm going to focus on a practical perspective. We'll start by defining closure in terms of what we can observe in different behavior of our programs, as opposed to if closure was not present in JS. However, later in this chapter, we're going to flip closure around to look at it from an alternative perspective.

Closure is a behavior of functions and only functions. Ifa you aren't dealing with function, closure does not apply. An object can not have closure, nor does a class have closure. Only function have.

consider:

```
function lookupStudent(studentID){

    var student = [
        {id: 1, name: "John"},
        {id: 2, name: "Sally"},
        {id: 3, name: "Bob"},
        {id: 4, name: "Sue"}
    ];
    return function greetStudent(greeting){
        var student = student.find(student => student.id === studentID);
    }
    return `${greeting} ${student.name}`;
}

var chosenStudent = [
    lookupStudent(1),
    lookupStudent(4),
];

chosenStudent[0]("Hello"); // "Hello John"
chosenStudent[1]("Hello"); // "Hello Sue"
```

The first thing to notice about this program is that the lookupStudent outer function creates and return an inner function called greetStudent. lookUpStudent is called twice, producing two separated instances of its inner greetStudent function, both of which are saved into the chosenStudent Array

## Pointed Closure
Actually, we glossed over a little detail in the previous discussion which im guessing many readers missed!

Because of how terse the syntax for => arrow function is, it's easy to forget that they still create a scope The student => student.id == studentID arrow function is creating another scop bubble inside the greetStudent function scope.

```
var student = students.find(student => student.id === studentID);
```

this arrow function creates a variable called student shadowing the var student in outer scope.

## Adding cup closures

let's examine a more complex example.

```
function adder(x){
    return function(y){
        return x + y;
    }
}
var add5 = adder(5);
var add10 = adder(10);

add5(2); // 7
add10(2); // 12

```

Each instance of adder creates a closure around the x value. The closure is created by the return function, which is a closure around the y value. This kind of function is also known as currying.

## Live link, Not a Snapshot
Closure is actually a live link, preserving access to the full variable itself. We're not limited to merely reading a value; the closed-over variable can be updated and re-assigned as well.

Let's examine an example where the closed-over variable is updated.

```
function makeCounter(){
    var count = 0;
    return function(){
        count = count + 1;
        return count;
    }
}

var hits makeCounter();

// later
hits(); // 1

// later

hits(); // 2
hits(); // 3

```
the count variable is closed over by the inner function, and is updated each time the inner function is called.

```
var hits;
{
    let count = 0;
    hits = function () {
        count++;
        return count;
    }
}

hits(); // 1
hits(); // 2
hits(); // 3
```

it's so common to mistake closure as value-oriented instead of variable-oriented. developers will be confused by the fact that the inner function is not a closure, but rather a function that returns a function. Consider the following example:



```
var studentName= "John";
function greetStudent(){
    console.log(`Hello ${studentName}`);
}

// later

studentName = "Sue";

// later

greetStudent(); // "Hello Sue"
```

When the studentName variable is updated, the greetStudent function is not affected, but the studentName variable is. This is because the greetStudent function is not a closure, but whenever greeting() is invoked after the studentName variable is updated, the studentName variable is passed in as a parameter.

the classic illustration of this mistakes is defining functions inside a loop:

```
var keeps = [];
for(var i = 0; i < 3; i++){
   keeps[i] =  function keepI(){
        return i;
    }
 
}

keeps[0](); // 3
keeps[1](); // 3
keeps[2](); // 3
```

you might have expected the keep\[0]() invocation return 0, since that function was created during the first iteration of the loop when i was 0. But it's actually returning 3, because the value of i is 3 at the time the function is invoked.

## Common closures: Ajax and Events
Closure is most commonly encountered with callbacks:

```
function lookupStudentRecord(studentID){
    ajax(`https://someapi/student/${studentID}`, function(student){
        console.log(`${student.name} (${studentID})`);
    });
}

lookupStudentRecord(1);
// "John (1)"
```
This is an asynchronous call, and the callback is invoked when the response is received after a short delay.

Why then is studentID still around and accessible in the callback? Closure.

Event handlers are another common usage of closure:

```
function listenForClicks(btn, label){
    btn.addEventListener("click", function(){
        console.log(label);
    });
}

var submitBtn = document.getElementById("submit");
listenForClicks(submitBtn, "Submit");
```

## What if i can't see it?

you've probably heard this common adage: 
> if a tree falls in the forest and nobody is around to hear, does it make a sound?

it's a silly bit of philosophy gymnastics. Of course, from a scientific perspective, sound waves are created. But the real point: *does it matter* if the sound happens?

Remember, the emphasis in our definition, closure is observability. If a closure exists but it can not be observed in our programs, does it matters? No.

For example, invoking a function that makes use of lexical scope lookup:

```
function say(myName){
    var greeting = "Hello";
    output();

    function output(){
        console.log(`${greeting} ${myName}`);
    }
}

say("John");
// "Hello John"
```

The inner function output() accesses the variables greeting and myName from its enclosing scope. But the invocation of output happens in that same scope, where of course greeting and myName are still available; that's sound just lexical scope, not closure.

Global scop variables essentially can not be closed over, because they're always accessible from everywhere. No function can ever be invoked in any part of the scope.

Consider:

```
var students = [
    {id:14, name: }
    
]
```
