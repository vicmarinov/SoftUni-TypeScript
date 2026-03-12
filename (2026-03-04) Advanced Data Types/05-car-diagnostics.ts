type CarPart = {
    partName: string;
    runDiagnostics: () => string;
};

type CarBody = {
    material: string;
    state: string;
} & CarPart;

type Tires = {
    airPressure: number;
    condition: string;
} & CarPart;

type Engine = {
    horsepower: number;
    oilDensity: number;
} & CarPart;

function someFunction (carBody: CarBody, tires: Tires, engine: Engine) {
    console.log('Function invocated');
}

someFunction(
    {
        material: 'aluminum',
        state: 'scratched',
        partName: 'Car Body',

        runDiagnostics (): string {
            return this.partName;
        }
    },
    {
        airPressure: 30,
        condition: 'needs change',
        partName: 'Tires',

        runDiagnostics (): string {
            return this.partName;
        }
    },
    {
        horsepower: 300,
        oilDensity: 780,
        partName: 'Engine',

        runDiagnostics (): string {
            return this.partName;
        }
    }
);