function operate (
    param: string | number | string[],
    operation: 'Index' | 'Length' | 'Add',
    operand: number
): string | number {
    if (operation === 'Index' && typeof param !== 'number') {
        return param[operand];
    } else if (operation === 'Length' && typeof param !== 'number') {
        return param.length % operand;
    } else if (operation === 'Add' && !Array.isArray(param)) {
        return Number(param) + operand;
    } else {
        throw new Error('Invalid operation!');
    }
}

console.log(operate(['First', 'Second', 'Third'], 'Index', 1));
console.log(operate('string', 'Index', 1));
console.log(operate(['Just', 'Two'], 'Length', 5));
console.log(operate('short string1', 'Length', 5));
console.log(operate('7', 'Add', 3));
console.log(operate(11, 'Add', 3));

// console.log(operate(5, 'Length', 2)); // Error