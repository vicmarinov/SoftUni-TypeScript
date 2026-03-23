class Product {
    private static productCount: number = 0;
    public readonly id: number;
    private _name!: string;
    private _price!: number;

    constructor (name: string, price: number) {
        this.id = ++Product.productCount;
        this.name = name;
        this.price = price;
    }

    public get name (): string {
        return this._name;
    }

    public set name (newName: string) {
        if (newName.length < 1) {
            throw new Error('Name must contain at least 1 character!');
        }

        this._name = newName;
    }

    public get price (): number {
        return this._price;
    }

    public set price (newPrice: number) {
        if (newPrice <= 0) {
            throw new Error('Price must be positive');
        }

        this._price = newPrice;
    }

    public getDetails (): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
    }
}

class Inventory {
    private products: Product[] = [];

    public addProduct (product: Product): void {
        this.products.push(product);
    }

    public listProducts (): string {
        return [
            ...this.products.map(product => product.getDetails()),
            `Total products created: ${this.products.length}`
        ].join('\n');
    }
}

const inventory = new Inventory();

const product1 = new Product('Laptop', 1200);
inventory.addProduct(product1);

const product2 = new Product('Phone', 800);
inventory.addProduct(product2);

console.log(inventory.listProducts());

// The following should produce errors:

// Product.productCount = 10;
// const product3 = new Product('', 800);
// const product4 = new Product('Phone', 0);
// product1.id = 5;