class Employee {
    public name: string;
    protected position: string;
    private salary: number;

    constructor (name: string, position: string, salary: number) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public getDetails (): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }

    public showSalary (): string {
        return `Salary: $${this.salary}`;
    }
}

const employee = new Employee("Alice", "Manager", 5000);
console.log(employee.getDetails());
console.log(employee.showSalary());
console.log(employee.name);

// The following should produce TS errors:

// console.log(employee.salary);
// console.log(employee.position);