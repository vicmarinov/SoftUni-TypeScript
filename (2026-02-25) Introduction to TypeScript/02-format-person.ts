function getPersonIntroduction ([name, age]: [string, number]): string {
    return `Hello, my name is ${name} and my age is ${age}`;
}

// Alternative solution
// --------------------

// function getPersonIntroduction (tuple: [string, number]): string {
//     const name: string = tuple[0];
//     const age: number = tuple[1];

//     return `Hello, my name is ${name} and my age is ${age}`;
// }

console.log(getPersonIntroduction(['Ivan', 20]));
console.log(getPersonIntroduction(['Joro', 30]));
// console.log(getPersonIntroduction(['Ivan', 20, 'Ivanov'])); // TS Error
// console.log(getPersonIntroduction(['Joro', '25']));         // TS Error
// console.log(getPersonIntroduction([]));                     // TS Error