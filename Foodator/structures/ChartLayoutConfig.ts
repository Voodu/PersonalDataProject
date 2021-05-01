import { months, weekdays } from '../other';

type TicksFunction = () => string[];
type TickFormatter =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[] | { (tick: any, index: number, ticks: any[]): string | number };

export class ChartLayoutConfig {
  private currentYear: number;
  private currentMonth: number;
  private daysInMonth: number;

  public ticks: TicksFunction = () => [];
  public tickFormatter: TickFormatter = (tick) => tick;
  public lineWidth = 5;

  constructor() {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth();
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
  }

  public setYearConfig(): void {
    this.ticks = () => Object.values(months);
    this.tickFormatter = (month) => month[0];
    this.lineWidth = 20;
  }

  public setMonthConfig(): void {
    this.ticks = () =>
      Array.from({ length: this.daysInMonth }, (_, i) => (i + 1).toString());
    this.tickFormatter = (day) => day;
    this.lineWidth = 8;
  }

  public setWeekConfig(): void {
    this.ticks = () => weekdays;
    this.tickFormatter = (weekday) => weekday.substr(0, 3);
    this.lineWidth = 35;
  }

  public setDayConfig(): void {
    this.ticks = () => Array.from(Array(24).keys()).map((num) => String(num));
    this.tickFormatter = (hour) => hour;
    this.lineWidth = 10;
  }
}
