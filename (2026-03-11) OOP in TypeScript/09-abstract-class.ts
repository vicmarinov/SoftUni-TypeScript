abstract class Shape {
    public readonly color: string;

    constructor (color: string) {
        this.color = color;
    }

    public abstract getArea (): number;
}

class Circle extends Shape {
    private radius: number;

    constructor (color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    public override getArea (): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Shape {
    private sideA: number;
    private sideB: number;

    constructor (color: string, sideA: number, sideB: number) {
        super(color);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    public override getArea (): number {
        return this.sideA * this.sideB;
    }
}

const circle = new Circle('red', 5);
console.log(circle.getArea());

const rectangle = new Rectangle('blue', 4, 6);
console.log(rectangle.getArea());