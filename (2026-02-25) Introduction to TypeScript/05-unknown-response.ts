function getValueProperty (response: unknown): string {
    return (
        typeof response === 'object' &&
        response !== null &&
        'value' in response &&
        typeof response.value === 'string'
    ) ? response.value : '-';
}

console.log(getValueProperty({
    code: 200,
    text: 'Ok',
    value: [1, 2, 3]
}));

console.log(getValueProperty({
    code: 301,
    text: 'Moved Permanently',
    value: 'New Url'
}));

console.log(getValueProperty({
    code: 201,
    text: 'Created',
    value: { name: 'Test', age: 20 }
}));

console.log(getValueProperty({
    code: 201,
    text: 'Created',
    value: 'Object Created'
}));
    
console.log(getValueProperty({
    code: 404,
    text: 'Not found'
}));

console.log(getValueProperty({
    code: 500,
    text: 'Internal Server Error'
}));