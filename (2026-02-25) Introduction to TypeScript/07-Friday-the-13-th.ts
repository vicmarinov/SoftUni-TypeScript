function printOnlyFridayThe13th (arr: unknown[]): void {
    enum MonthNames {
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    }

    for (const element of arr) {
        const isElementFridayThe13th = (
            element instanceof Date &&
            element.getDay() === 5 &&
            element.getDate() === 13
        );

        if (isElementFridayThe13th) {
            const day = element.getDate();
            const month = MonthNames[element.getMonth()];
            const year = element.getFullYear();

            console.log(`${day}-${month}-${year}`);
        }
    }
}

printOnlyFridayThe13th([
    {},
    new Date(2025, 4, 13),
    null,
    new Date(2025, 5, 13),
    '13-09-2023',
    new Date(2025, 6, 13),
]);

printOnlyFridayThe13th([
    new Date(2024,  0, 13),
    new Date(2024,  1, 13),
    new Date(2024,  2, 13),
    new Date(2024,  3, 13),
    new Date(2024,  4, 13),
    new Date(2024,  5, 13),
    new Date(2024,  6, 13),
    new Date(2024,  7, 13),
    new Date(2024,  8, 13),
    new Date(2024,  9, 13),
    new Date(2024, 10, 13),
    new Date(2024, 11, 13)
]);