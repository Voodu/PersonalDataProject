export class Time {
  public static readonly now = new Date('2021-02-04T23:12');
  public static readonly currentYear: number = Time.now.getFullYear();
  public static readonly currentMonth: number = Time.now.getMonth();
  public static readonly currentWeek: number = Time.getWeekNumber(Time.now);
  public static readonly currentDay: number = Time.now.getDay();
  public static readonly daysInMonth: number = new Date(
    Time.currentYear,
    Time.currentMonth + 1,
    0
  ).getDate();

  public static readonly months = [
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
    'December',
  ];

  public static readonly weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public static getWeekNumber(date: Date): number {
    // Copy date so don't modify original
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }
}
