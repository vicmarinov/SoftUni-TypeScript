function authorizeUser (authorizationService: MockAuthorizationService) {
    return function (
        target: object,
        propertyName: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalGetter = descriptor.get!;

        descriptor.get = function () {
            if (!authorizationService.canViewData(propertyName)) {
                throw new Error(
                    'You are not authorized to view this information'
                );
            }

            return originalGetter.call(this);
        };

        return descriptor;
    };
}

class MockAuthorizationService {
    private userRole: 'Guest' | 'PersonalDataAdministrator' | 'Admin';

    constructor (userRole: 'Guest' | 'PersonalDataAdministrator' | 'Admin') {
        this.userRole = userRole;
    }

    public canViewData (property: string): boolean {
        switch (this.userRole) {
            case 'Admin':
                return true;
            case 'PersonalDataAdministrator':
                return ['name', 'age'].includes(property);
            default:
                return false;
        }
    }
}

const authorizationService = new MockAuthorizationService('Admin');

// These would lead to the producing of errors in the test bellow:

// const authorizationService = new MockAuthorizationService('PersonalDataAdministrator');
// const authorizationService = new MockAuthorizationService('Guest');

class User {
    private _name: string;
    private _age: number;
    private _creditCardNumber: string;

    constructor (name: string, age: number, creditCardNumber: string) {
        this._name = name;
        this._age = age;
        this._creditCardNumber = creditCardNumber;
    }

    @authorizeUser(authorizationService)
    public get name (): string {
        return this._name;
    }
    
    @authorizeUser(authorizationService)
    public get age (): number {
        return this._age;
    }
    
    @authorizeUser(authorizationService)
    public get creditCardNumber (): string {
        return this._creditCardNumber;
    }
}

const user = new User('John Doe', 30, 'ABCD-1234');

console.log(user.name);
console.log(user.age);
console.log(user.creditCardNumber);