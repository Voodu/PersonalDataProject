export class Time {
  public now: Date;
  public currentYear: number;
  public currentMonth: number;
  public currentWeek: number;
  public currentDay: number;
  public daysInMonth: number;

  constructor(now: Date) {
    this.now = now;
    this.currentYear = this.now.getFullYear();
    this.currentMonth = this.now.getMonth();
    this.currentWeek = Time.getWeekNumber(this.now);
    this.currentDay = this.now.getDay();
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
  }

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

  public changeYear(diff: -1 | 0 | 1): void {
    this.addDays(diff * this.daysInYear(this.currentYear));
    this.refreshProps();
  }

  public changeMonth(diff: -1 | 0 | 1): void {
    this.addDays(diff * this.daysInMonth);
    this.refreshProps();
  }

  public changeWeek(diff: -1 | 0 | 1): void {
    this.addDays(diff * 7);
    this.refreshProps();
  }

  private addDays(days: number) {
    this.now.setDate(this.now.getDate() + days);
  }

  private isLeapYear(year: number): boolean {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  private daysInYear(year: number): number {
    return this.isLeapYear(year) ? 366 : 365;
  }

  private refreshProps() {
    this.currentYear = this.now.getFullYear();
    this.currentMonth = this.now.getMonth();
    this.currentWeek = Time.getWeekNumber(this.now);
    this.currentDay = this.now.getDay();
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
  }
}
