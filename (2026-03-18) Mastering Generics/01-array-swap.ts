function swap<T> (
    a: T[],
    aIndex: number,
    b: T[],
    bIndex: number
): void {
    [a[aIndex], b[bIndex]] = [b[bIndex], a[aIndex]];
    
    // Alternative:
    
    // const temp = a[aIndex];
    // a[aIndex] = b[bIndex];
    // b[bIndex] = temp;
}

const arrayA = ['test', '123'];
const arrayB = ['a', 'b', 'c'];

swap<string>(arrayA, 0, arrayB, 2);

console.log(arrayA);
console.log(arrayB);

const arrayC = [20, 30, 40];
const arrayD = [1, 2, 3, 4, 5];
swap<number>(arrayC, 0, arrayD, 2);
console.log(arrayC);
console.log(arrayD);