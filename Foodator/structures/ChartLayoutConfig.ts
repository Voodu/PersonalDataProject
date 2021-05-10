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

  public jitterX(seed: number | string): number {
    if (typeof seed === 'string') {
      seed = ChartLayoutConfig.hashCode(seed);
    }
    return this.jitter(seed, this.jitterMagnitude.x);
  }

  public jitterY(seed: number | string): number {
    if (typeof seed === 'string') {
      seed = ChartLayoutConfig.hashCode(seed);
    }
    return this.jitter(seed, this.jitterMagnitude.y);
  }

  private jitter(seed: number, halfRange: number) {
    const [min, max] = [-halfRange, halfRange];
    const range = max - min;
    return (seed % range) + min;
  }

  private static hashCode(s: string): number {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const character = s.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
