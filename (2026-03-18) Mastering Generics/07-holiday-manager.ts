enum TravelVacation {
    Abroad = 'Abroad',
    InCountry = 'InCountry'
};

enum MountainVacation {
    Ski = 'Ski',
    Hiking = 'Hiking'
};

enum BeachVacation {
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving'
};

interface Holiday {
    set start (val: Date);
    set end (val: Date);
    getInfo (): string;
}

interface VacationManager<T, V> {
    reserveVacation (holiday: T, vacationType: V): void;
    listReservations (): string;
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor (start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    public set start (value: Date) {
        if (value > this._end) {
            throw new Error('End date cannot be before start date');
        }

        this._start = value;
    }

    public set end (value: Date) {
        if (value < this._start) {
            throw new Error('End date cannot be before start date');
        }

        this._end = value;
    }

    public getInfo (): string {
        return `Holiday: ${PlannedHoliday.formatDate(this._start)} - ${PlannedHoliday.formatDate(this._end)}`;
    }

    private static formatDate (value: Date): string {
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }
}

class HolidayManager<H extends Holiday, T extends TravelVacation | MountainVacation | BeachVacation> implements VacationManager<H, T> {
    private holidaysByType: Map<T, H[]> = new Map<T, H[]>();

    public reserveVacation (holiday: H, vacationType: T): void {
        if (!this.holidaysByType.has(vacationType)) {
            this.holidaysByType.set(vacationType, []);
        }

        this.holidaysByType.get(vacationType)!.push(holiday);
    }

    public listReservations (): string {
        return Array.from(this.holidaysByType.entries())
            .flatMap(([type, holidays]) => {
                return holidays
                    .map(holiday => `${holiday.getInfo()} => ${type}`);
            })
            .join('\n');
    }
}

console.log('\nTest 1:\n');

{
    const holiday = new PlannedHoliday(
        new Date(2024, 1, 1),
        new Date(2024, 1, 4)
    );

    const holiday2 = new PlannedHoliday(
        new Date(2025, 3, 14),
        new Date(2025, 3, 17)
    );

    const holidayManager = new HolidayManager<Holiday, TravelVacation>();

    holidayManager.reserveVacation(holiday, TravelVacation.Abroad);
    holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);

    console.log(holidayManager.listReservations());
}

console.log('\nTest 2:\n');

{
    const holiday = new PlannedHoliday(
        new Date(2022, 10, 11),
        new Date(2022, 10, 18)
    );

    const holiday2 = new PlannedHoliday(
        new Date(2024, 5, 18),
        new Date(2024, 5, 22)
    );

    const holidayManager = new HolidayManager<Holiday, BeachVacation>();

    holidayManager.reserveVacation(holiday, BeachVacation.ScubaDiving);
    holidayManager.reserveVacation(holiday2, BeachVacation.Sea);

    console.log(holidayManager.listReservations());
}

// The following should produce errors:

// console.log('\nTest 3:\n');

// {
//     const holiday3 = new PlannedHoliday(
//         new Date(2021, 3, 14),
//         new Date(2020, 3, 17)
//     );

//     const holiday4 = new PlannedHoliday(
//         new Date(2024, 2, 1),
//         new Date(2024, 1, 4)
//     );
// }

// The following should produce TS errors:

// console.log('\nTest 4:\n');

// {
//     const holiday = new PlannedHoliday(
//         new Date(2024, 1, 1),
//         new Date(2024, 1, 4)
//     );

//     const holiday2 = new PlannedHoliday(
//         new Date(2025, 3, 14),
//         new Date(2024, 3, 17)
//     );

//     const holidayManager = new HolidayManager<Holiday, MountainVacation>();

//     holidayManager.reserveVacation(holiday, BeachVacation.ScubaDiving);
//     holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);
//     console.log(holidayManager.listReservations())
// }