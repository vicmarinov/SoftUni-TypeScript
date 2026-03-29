function addCreatedOnTimestamp<C extends { new(...args: any[]): object; }> (
    constructor: C
) {
    return class extends constructor {
        private createdOnTimestamp: Date = new Date();
    }
}

function filterNewlyCreatedItems<I extends { createdOnTimestamp: Date; }> (
    timeLimitInMilliseconds: number
) {
    return function (
        target: object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function (): I[] {
            const items: I[] = originalMethod.call(this);

            return items
                .filter(item => {
                    const currentTime = new Date().getTime();
                    const itemTimestamp = item.createdOnTimestamp.getTime();

                    const timeDifference = currentTime - itemTimestamp;
                    return timeDifference <= timeLimitInMilliseconds;
                });
        }

        return descriptor;
    }
}

function censorResult<I extends { [key: string]: any; }> (
    censorService: MockCensorService<I>
) {
    return function (
        target: object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;
    
        descriptor.value = function (): I[] {
            const items: I[] = originalMethod.call(this);
            return censorService.censorProperties(items);
        }
    
        return descriptor;
    }
}

function logMethodCalls (
    target: object,
    methodName: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
        console.log(`Method ${methodName} called successfully`);
        return originalMethod.call(this, ...args);
    }

    return descriptor;
}

class MockCensorService<I extends { [key: string]: any; }> {
    private censoredProperties: string[];

    constructor (censoredProperties: string[]) {
        this.censoredProperties = censoredProperties;
    }

    public censorProperties (items: I[]): I[] {
        const censoredItems = items.slice();
        
        censoredItems.forEach(item => {
            this.censoredProperties
                .forEach(property => {
                    delete item[property];
                });
        });

        return censoredItems;
    }
}

@addCreatedOnTimestamp
class User {
    public name: string;
    public age: number;
    public creditCardNumber: string;

    constructor (name: string, age: number, creditCardNumber: string) {
        this.name = name;
        this.age = age;
        this.creditCardNumber = creditCardNumber;
    }

    public getInfo (): string {
        return `${this.name}, Age: ${this.age} CreditCardNumber: ${this.creditCardNumber}`;
    }
}

@addCreatedOnTimestamp
class Employee {
    public name: string;
    public birthday: Date;
    public salary: number;

    constructor (name: string, birthday: Date, salary: number) {
        this.name = name;
        this.birthday = birthday;
        this.salary = salary;
    }

    public getInfo (): string {
        return `${this.name}, Birthday: ${this.birthday?.toLocaleDateString()} Salary: ${this.salary}`;
    }
}

// Test 1:

const userCensorService = new MockCensorService<User>(['creditCardNumber']);
const employeeCensorService = new MockCensorService<Employee>(['birthday', 'salary']);

// Test 2:

// const userCensorService = new MockCensorService<User>(['age']);
// const employeeCensorService = new MockCensorService<Employee>(['salary']);

class UsersService {
    private _users: User[];
    private _employees: Employee[];
    
    constructor (users: User[], employees: Employee[]) {
        this._users = users;
        this._employees = employees;
    }

    public addUser (user: User): void {
        this._users.push(user);
    }

    public addEmployee (employee: Employee): void {
        this._employees.push(employee);
    }

    @censorResult(userCensorService)
    @filterNewlyCreatedItems(5 * 1000)
    public getUsers (): User[] {
        return this._users;
    }

    @logMethodCalls
    @censorResult(employeeCensorService)
    @filterNewlyCreatedItems(10 * 1000)
    public getEmployees (): Employee[] {
        return this._employees;
    }
}

const user1: User = new User('John Does',  30, 'ABCD-1234');
const user2: User = new User('Benny Tres', 23, 'EFGH-5678');

const employee1: Employee = new Employee('Sarah Connor',          new Date(1964, 4, 15), 2500);
const employee2: Employee = new Employee('Arnold Schwarzenegger', new Date(1947, 6, 30), 3500);

const usersService: UsersService = new UsersService(
    [
        user1,
        user2
    ],
    [
        employee1,
        employee2
    ]
);

const users: User[] = usersService.getUsers();
console.log(users.map(user => user.getInfo()));

const employees: Employee[] = usersService.getEmployees();
console.log(employees.map(employee => employee.getInfo()));

// 7 seconds later:

setTimeout(() => {
    const user3: User = new User('Jimmy Quatro', 27, 'IJKL-9012');
    const employee3: Employee = new Employee('Kyle Reese', new Date(2004, 0, 1), 2000);

    usersService.addUser(user3);
    usersService.addEmployee(employee3);

    const users: User[] = usersService.getUsers();
    console.log(users.map(user => user.getInfo()));

    const employees: Employee[] = usersService.getEmployees();
    console.log(employees.map(employee => employee.getInfo()));
}, 7000);

// 15 seconds later:

setTimeout(() => {
    const users: User[] = usersService.getUsers();
    console.log(users.map(user => user.getInfo()));

    const employees: Employee[] = usersService.getEmployees();
    console.log(employees.map(employee => employee.getInfo()));
}, 15000);