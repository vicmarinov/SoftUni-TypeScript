class Calculator {
    public calculate (operation: 'power' | 'log', operandA: number, operandB: number): number;
    public calculate (operation: 'add' | 'subtract' | 'multiply' | 'divide', operandA: number, operandB: number, operandC?: number, operandD?: number): number;
    public calculate (operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'log', operandA: number, operandB: number, operandC?: number, operandD?: number): number {
        const operands = [operandA, operandB, operandC, operandD]
            .filter(operand => operand !== undefined);
        
        switch (operation) {
            case 'add':
                return operands
                    .reduce((sum, value) => sum + value);
            case 'subtract':
                return operands
                    .reduce((result, value) => result - value);
            case 'multiply':
                return operands
                    .reduce((product, value) => product * value);
            case 'divide':
                return operands
                    .reduce((result, value) => result / value);
            case 'power':
                return Math.pow(operandA, operandB);
            case 'log':
                return Math.log(operandA) / Math.log(operandB);
        }
    }
}

const calculator = new Calculator();
console.log(calculator.calculate('power', 2, 3));
console.log(calculator.calculate('power', 4, 1 / 2));
console.log(calculator.calculate('log', 8, 2));
console.log(calculator.calculate('add', 10, 5));
console.log(calculator.calculate('add', 10, 5, 3));
console.log(calculator.calculate('subtract', 10, 5));
console.log(calculator.calculate('multiply', 2, 3, 4));
console.log(calculator.calculate('divide', 100, 5, 2, 2));

// The following should produce errors:

// const calculator2 = new Calculator();
// console.log(calculator2.calculate('power', 2, 3, 2));
// console.log(calculator2.calculate('add', 2));
// console.log(calculator2.calculate('log', 2, 3, 4, 5));
// console.log(calculator2.calculate('multiply', 2, 3, 4, 5, 6));