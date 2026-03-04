function getStringsInfo (strings: string[]): [string, number] {
    const concatenatedStrings: string = strings.join('');
    const stringsTotalLength: number = concatenatedStrings.length;

    return [concatenatedStrings, stringsTotalLength];
}

console.log(getStringsInfo([
    'How',
    'are',
    'you?'
]));

console.log(getStringsInfo([
    'Today',
    ' is',
    ' a ',
    'nice',
    ' ',
    'day for ',
    'TypeScript'
]));