function validateAge (
    target: object,
    key: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalSetter = descriptor.set!;

    descriptor.set = function (newAge: number) {
        if (newAge < 1 || newAge > 200) {
            throw new Error('Age must be between 1 and 200');
        }

        originalSetter.call(this, newAge);
    }

    return descriptor;
}

class Age {
    private _age!: number;
    
    constructor (age: number) {
        this.age = age;
    }

    @validateAge
    set age (val: number) {
        this._age = val;
    }

    get age (): number {
        return this._age;
    }
}

const ageValue: Age = new Age(10);
ageValue.age = -10;