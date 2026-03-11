type TrainFloor = {
    number: 1;
    hallway: 'A' | 'C';
    train(): void;
};

type DineFloor = {
    number: 2;
    hallway: 'A' | 'C';
    dine(): void;
};

type SleepFloor = {
    number: 3;
    hallway: 'A' | 'C';
    sleep(): void;
};

type PassFloor = (TrainFloor | DineFloor) & {
    hallway: 'A';
    pass?: 'Guest';
};

function visitFloor (floor: TrainFloor | DineFloor | SleepFloor | PassFloor) {
    switch (floor.number) {
        case 1: floor.train(); return;
        case 2: floor.dine();  return;
        case 3: floor.sleep(); return;
    }
}

visitFloor({ train () { }, number: 1, hallway: 'A', pass: 'Guest' });
visitFloor({ dine () { }, number: 2, hallway: 'A' });
visitFloor({ sleep () { }, number: 3, hallway: 'C' });
visitFloor({ train () { }, number: 1, hallway: 'C' });
visitFloor({ train () { }, number: 1, hallway: 'A' });
visitFloor({ dine () { }, number: 2, hallway: 'A', pass: 'Guest' });
visitFloor({ sleep () { }, number: 3, hallway: 'A' });
visitFloor({ dine () { }, number: 2, hallway: 'C' });

// The following should produce TS errors:

// visitFloor({ train() { }, number: 4, hallway: 'A' });
// visitFloor({ train() { }, number: 1, hallway: 'C', pass: 'Guest' });
// visitFloor({ train() { }, number: 2, hallway: 'A' });
// visitFloor({ train() { }, number: 3, hallway: 'C' });
// visitFloor({ train() { }, number: 3, hallway: 'C', pass: 'Guest' });

// visitFloor({ dine() { }, number: 1, hallway: 'A' });
// visitFloor({ dine() { }, number: 1, hallway: 'B' });
// visitFloor({ dine() { }, number: 1, hallway: 'C' });
// visitFloor({ dine() { }, number: 3, hallway: 'C' });
// visitFloor({ dine() { }, number: 2, hallway: 'C', pass: 'Guest' });
// visitFloor({ dine() { }, number: 1, hallway: 'A', pass: 'Guest' });

// visitFloor({ sleep() { }, number: 3, hallway: 'D' });
// visitFloor({ sleep() { }, number: 4, hallway: 'C' });
// visitFloor({ sleep() { }, number: 1, hallway: 'C' });
// visitFloor({ sleep() { }, number: 1, hallway: 'A' });
// visitFloor({ sleep() { }, number: 2, hallway: 'A' });
// visitFloor({ sleep() { }, number: 2, hallway: 'C' });