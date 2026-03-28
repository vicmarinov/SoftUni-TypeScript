function validateName (minLength: number) {
    return function (
        target: object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalSetter = descriptor.set!;

        descriptor.set = function (newValue: string) {
            if (newValue.length < minLength) {
                throw new Error(
                    `Name must have a min length of ${minLength} characters`
                );
            }

            originalSetter.call(this, newValue);
        }

        return descriptor;
    }
}

function validateAge (min: number, max: number) {
    return function (
        target: object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalSetter = descriptor.set!;

        descriptor.set = function (newValue: number) {
            if (newValue < min || newValue > max) {
                throw new Error(`Age must be between ${min} and ${max}`);
            }

            originalSetter.call(this, newValue);
        }

        return descriptor;
    }
}

function validatePassword (pattern: RegExp) {
    return function (
        target: object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalSetter = descriptor.set!;

        descriptor.set = function (newValue: string) {
            if (!pattern.test(newValue)) {
                throw new Error(`Password needs to match ${pattern}`);
            }

            originalSetter.call(this, newValue);
        }

        return descriptor;
    }
}

const validateProperty = {
    'name': validateName,
    'age': validateAge,
    'password': validatePassword
}

const minNameLength: number = 1;
const minAge: number = 1;
const maxAge: number = 150;
const passwordPattern: RegExp = /^[a-zA-Z0-9!@]+$/;

// These would lead to the producing of errors in the test bellow:

// const minNameLength: number = 3;
// const minAge: number = 1;
// const maxAge: number = 100;
// const passwordPattern: RegExp = /^[a-zA-Z0-9]+$/;

class User {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor (name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @validateProperty.name(minNameLength)
    set name (newValue: string) {
        this._name = newValue;
    }

    @validateProperty.age(minAge, maxAge)
    set age (newValue: number) {
        this._age = newValue;
    }
    
    @validateProperty.password(passwordPattern)
    set password (newValue: string) {
        this._password = newValue;
    }

    get name () {
        return this._name;
    }

    get age () {
        return this._age;
    }
}

const user1 = new User('John', 130, 'hardPassword12');
const user2 = new User('John', 30,  '!test'         );
const user3 = new User('John', 25,  '@werty'        );
const user4 = new User('Jo',   20,  'password123'   );