import { Time } from './Time';
import { TicksFunction, TickFormatter } from './types';

export class ChartLayoutConfig {
  public time: Time;
  public title = 'No title';
  public xTicks: TicksFunction = () => [];
  public yTicks: TicksFunction = () => [];
  public xTickFormatter: TickFormatter = (tick) => tick;
  public yTickFormatter: TickFormatter = (tick) => tick;
  public dataSize = 5;
  private jitterMagnitude = { x: 5, y: 5 };

  constructor(time: Time) {
    this.time = time;
    this.yTicks = () =>
      Array.from(Array(23).keys()).map((num) => String(num + 1));
    this.yTickFormatter = (hour) => `${hour}:00`;
  }

  public setYearConfig(): void {
    this.xTicks = () => Object.values(Time.months);
    this.xTickFormatter = (month) => month[0];
    this.dataSize = 3;
    this.title = `Year ${this.time.currentYear}`;
    this.jitterMagnitude = { x: 5, y: 0 };
  }

  public setMonthConfig(): void {
    this.xTicks = () =>
      Array.from({ length: this.time.daysInMonth }, (_, i) =>
        (i + 1).toString()
      );
    this.xTickFormatter = (day) => day;
    this.dataSize = 3;
    this.title = `${Time.months[this.time.currentMonth]}, ${
      this.time.currentYear
    }`;
    this.jitterMagnitude = { x: 3, y: 3 };
  }

  public setWeekConfig(): void {
    this.xTicks = () => Time.weekdays;
    this.xTickFormatter = (weekday) => weekday.substr(0, 3);
    this.dataSize = 4;
    this.title = `Week ${this.time.currentWeek}, ${this.time.currentYear}`;
    this.jitterMagnitude = { x: 10, y: 5 };
  }

  public jitterX(): number {
    const [min, max] = [-this.jitterMagnitude.x, this.jitterMagnitude.x];
    const range = max - min;
    return Math.random() * range - max;
  }

  public jitterY(): number {
    const [min, max] = [-this.jitterMagnitude.y, this.jitterMagnitude.y];
    const range = max - min;
    return Math.random() * range - max;
  }
}
