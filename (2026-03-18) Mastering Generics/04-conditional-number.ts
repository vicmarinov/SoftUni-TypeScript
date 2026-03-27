function conditionalNumber<T> (
    parameter: T extends number ? number : string
): void {
    if (typeof parameter === 'number') {
        console.log(parameter.toFixed(2));
    } else {
        console.log(parameter);
    }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');

// The following should produce TS errors:

// conditionalNumber<boolean>(30);
// conditionalNumber<number>('test');