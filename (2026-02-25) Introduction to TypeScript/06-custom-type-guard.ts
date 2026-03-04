function isNonEmptyStringArray (arg: unknown): arg is string[] {
    return (
        Array.isArray(arg) &&
        arg.length > 0 &&
        arg.every(element => typeof element === 'string')
    );
}

const testValues: unknown[] = [
    {},
    { test: 'one' },
    [],
    undefined,
    null,
    [12, 13],
    ['test', 123],
    ['a', 'b', 'c']
];

for (const testValue of testValues) {
    console.log(isNonEmptyStringArray(testValue));
}

console.log('-----');

for (const testValue of testValues) {
    if (isNonEmptyStringArray(testValue)) {
        console.log(testValue.length);
    }
}