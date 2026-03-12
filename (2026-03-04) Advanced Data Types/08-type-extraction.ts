type Person = {
    name: string;
    surname: string;
    age: number;
    getPersonInfo: () => string;
};

type Address = {
    city: string;
    street: string;
    buildingNumber: number;
    postalCode: number;
    getAddressInfo: () => string;
};

type DataPrinter = (data: Person & Address) => void;

function createDataPrinter (person: Person, address: Address): DataPrinter {
    return function printData (data: Person & Address): void {
        console.log(`Hello, ${data.getPersonInfo()} from ${data.getAddressInfo()}`);
    }
}

const person: Person = {
    name: 'John',
    surname: 'Doe',
    age: 22,
    getPersonInfo () {
        return `${this.name} ${this.surname}, age ${this.age}`;
    }
};

const address: Address = {
    city: 'Boston',
    street: 'Nowhere street',
    buildingNumber: 13,
    postalCode: 51225,
    getAddressInfo () {
        return `${this.street} ${this.buildingNumber}, ${this.city} ${this.postalCode}`;
    }
};

const printData: DataPrinter = createDataPrinter(person, address);

const data: Person & Address = Object.assign({}, person, address);
printData(data);