import { Time } from './Time';
import { TicksFunction, TickFormatter } from './types';

export class ChartLayoutConfig {
  public xTicks: TicksFunction = () => [];
  public yTicks: TicksFunction = () => [];
  public xTickFormatter: TickFormatter = (tick) => tick;
  public yTickFormatter: TickFormatter = (tick) => tick;
  public lineWidth = 5;

  constructor() {
    this.yTicks = () => Array.from(Array(24).keys()).map((num) => String(num));
    this.yTickFormatter = (hour) => `${hour}:00`;
  }

  public setYearConfig(): void {
    this.xTicks = () => Object.values(Time.months);
    this.xTickFormatter = (month) => month[0];
    this.lineWidth = 20;
  }

  public setMonthConfig(): void {
    this.xTicks = () =>
      Array.from({ length: Time.daysInMonth }, (_, i) => (i + 1).toString());
    this.xTickFormatter = (day) => day;
    this.lineWidth = 8;
  }

  public setWeekConfig(): void {
    this.xTicks = () => Time.weekdays;
    this.xTickFormatter = (weekday) => weekday.substr(0, 3);
    this.lineWidth = 35;
  }

  public setDayConfig(): void {
    this.xTicks = () => Array.from(Array(24).keys()).map((num) => String(num));
    this.xTickFormatter = (hour) => hour;
    this.lineWidth = 10;
  }
}
