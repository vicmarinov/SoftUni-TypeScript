function log (
    target: object | Function,
    methodName: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
        console.log(
            `Function ${methodName} called with arguments: ${args.join(', ')}`
        );
        
        return originalMethod.call(this, ...args);
    }

    return descriptor;
}

class Person {
    public fName: string;
    public lName: string;

    constructor (firstName: string, lastName: string) {
        this.fName = firstName;
        this.lName = lastName;
    }

    @log
    public static getFullName (firstName: string, lastName: string): string {
        return `${firstName} ${lastName}`;
    }
}

const person = new Person('John', 'Does');

Person.getFullName(person.fName, person.lName);
Person.getFullName('Benny', 'Tres');