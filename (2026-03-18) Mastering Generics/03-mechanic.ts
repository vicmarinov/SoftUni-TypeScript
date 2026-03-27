type Car = {
    engine: { horsepower: number; };
    tires: { model: string; airPressure: number; };
    body: { material: string; };
};

class Mechanic<T extends Car> {
    technicalInspection (car: T): boolean {
        return true;
    }
}

const mechanic = new Mechanic();

const someCar = {
    engine: { horsepower: 350, type: 'diesel' },
    tires: { model: 'BRIT', airPressure: 33 },
    body: { material: 'aluminum' }
};

const notACar = { vroom: false };

const maybeCar = {
    tires: { model: 'BRIT' },
    body: { material: 'aluminum' }
};

const maybeCar2 = {
    engine: { horsepower: 220 },
    tires: { model: 'BRIT', wear: 'High', airPressure: 33 },
    body: { material: 'aluminum' }
};

const maybeCar3 = {
    engine: { horsepower: 250 },
    tires: { model: 'Nie' }
};

const maybeCar4 = {
    engine: { horsepower: 220, type: 'electric' },
    tires: { model: 'BRIT' },
    body: { material: 'steel', weight: 2670 }
};

const maybeCar5 = {
    engine: { horsepower: '220', type: 'electric' },
    tires: { model: 'BRIT', airPressure: 28 },
    body: { material: 'steel', weight: 2670 }
};

mechanic.technicalInspection(someCar);
mechanic.technicalInspection(maybeCar2);

// The following should produce TS errors:

// mechanic.technicalInspection(maybeCar4);
// mechanic.technicalInspection(notACar);
// mechanic.technicalInspection(maybeCar);
// mechanic.technicalInspection(maybeCar3);
// mechanic.technicalInspection(maybeCar5);