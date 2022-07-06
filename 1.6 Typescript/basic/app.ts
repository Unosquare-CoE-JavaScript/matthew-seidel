const example = (args) => {
    return `${args.foo} ${args.bar}`;
}

const results = example({ foo: 'hello', bar: 1, baz: 'world' });