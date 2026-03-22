class Vehicle {
    protected brand: string;

    constructor (brandName: string) {
        this.brand = brandName;
    }

    public drive (): string {
        return `Driving a ${this.brand}`;
    }
}

class Car extends Vehicle {
    private model: string;

    constructor (brandName: string, model: string) {
        super(brandName);
        this.model = model;
    }

    public override drive ():string {
        return `Driving a ${this.brand} ${this.model}`;
    }
}

const car = new Car('Toyota', 'Corolla');
console.log(car.drive());