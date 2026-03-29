function addCreatedOn<T extends new (...args: any[]) => {}> (constructor: T) {
    return class extends constructor {
        public createdOn: Date = new Date();
    }
}

@addCreatedOn
class User {
    private name: string;
    private age: number;

    constructor (name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public displayUserInfo (): void {
        console.log(`${this.name}, Age: ${this.age}`);
    }
}

const user = new User('John Doe', 30);
user.displayUserInfo();
console.log(user);
console.log((user as any).createdOn);