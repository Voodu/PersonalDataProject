import { Time } from './Time';
import { TicksFunction, TickFormatter } from './types';

export class ChartLayoutConfig {
  public title = 'No title';
  public xTicks: TicksFunction = () => [];
  public yTicks: TicksFunction = () => [];
  public xTickFormatter: TickFormatter = (tick) => tick;
  public yTickFormatter: TickFormatter = (tick) => tick;
  public lineWidth = 5;

  constructor() {
    this.yTicks = () =>
      Array.from(Array(23).keys()).map((num) => String(num + 1));
    this.yTickFormatter = (hour) => `${hour}:00`;
  }

  public setYearConfig(): void {
    this.xTicks = () => Object.values(Time.months);
    this.xTickFormatter = (month) => month[0];
    this.lineWidth = 20;
    this.title = `Year ${Time.currentYear}`;
  }

  public setMonthConfig(): void {
    this.xTicks = () =>
      Array.from({ length: Time.daysInMonth }, (_, i) => (i + 1).toString());
    this.xTickFormatter = (day) => day;
    this.lineWidth = 8;
    this.title = `${Time.months[Time.currentMonth]}, ${Time.currentYear}`;
  }

  public setWeekConfig(): void {
    this.xTicks = () => Time.weekdays;
    this.xTickFormatter = (weekday) => weekday.substr(0, 3);
    this.lineWidth = 35;
    this.title = `Week ${Time.currentWeek}, ${Time.currentYear}`;
  }
}
