function multiply (
    firstParameter?: string | number,
    secondParameter?: string | number,
    thirdParameter?: string | number
): number {
    return [firstParameter, secondParameter, thirdParameter]
        .filter(value => value !== undefined)
        .map(Number)
        .reduce((product, num) => product * num, 1);
}

console.log(multiply('3', 5, '10'));
console.log(multiply('2','2'));
console.log(multiply(undefined, 2, 3));
console.log(multiply(7, undefined, '2'));
console.log(multiply());