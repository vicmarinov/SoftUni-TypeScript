function printWeekDay (weekDayName: string): void {
    enum WeekDaysNames {
        'Monday' = 1,
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    };

    console.log(
        WeekDaysNames[weekDayName as keyof typeof WeekDaysNames] ?? 'error'
    );
}

printWeekDay('Monday');
printWeekDay('Tuesday');
printWeekDay('Wednesday');
printWeekDay('Thursday');
printWeekDay('Friday');
printWeekDay('Saturday');
printWeekDay('Sunday');

printWeekDay('Invalid');