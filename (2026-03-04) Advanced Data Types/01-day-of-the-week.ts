function printWeekDayName (weekDay: number): void {
    enum WeekDaysNames {
        'Monday' = 1,
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    };

    console.log(WeekDaysNames[weekDay] ?? 'error');
}

printWeekDayName(1);
printWeekDayName(2);
printWeekDayName(3);
printWeekDayName(4);
printWeekDayName(5);
printWeekDayName(6);
printWeekDayName(7);
printWeekDayName(8);