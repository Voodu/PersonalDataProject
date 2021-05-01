import { getWeekNumber, months, weekdays } from '../other';

type TAgg<T> = {
  [name: number]: T[];
};
type FilterFunction<T> = (item: T) => boolean;
type LabelSelectorFunction = (label: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GroupSelectorFunction<T> = (current: T) => number | string | any;
type AggregateFunction<T> = (items: T[]) => number;
type GroupFunction<T> = (acc: TAgg<T>, current: T) => TAgg<T>;

export class ChartDataProcessorConfig<T> {
  private currentYear: number;
  private currentMonth: number;
  private currentWeek: number;
  private currentDay: number;
  private daysInMonth: number;

  public filter: FilterFunction<T> = () => true;
  public groupSelector: GroupSelectorFunction<T> = (items) => items;
  public labelSelector: LabelSelectorFunction = (label) => label;
  public aggregate: AggregateFunction<T> = () => 0;

  public group: GroupFunction<T> = (acc: TAgg<T>, current: T) => {
    const i = this.groupSelector(current);
    acc[i] = acc[i] ? acc[i].concat(current) : [current];
    return acc;
  };

  constructor() {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth();
    this.currentWeek = getWeekNumber(now);
    this.currentDay = now.getDay();
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
  }

  public setYearConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === this.currentYear;
    this.groupSelector = (current) => dateSelector(current).getMonth();
    this.labelSelector = (monthIx) => months[+monthIx];
    this.aggregate = aggregateFunction;
  }

  public setMonthConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === this.currentYear &&
      dateSelector(item).getMonth() === this.currentMonth;
    this.groupSelector = (current) => dateSelector(current).getDate();
    this.labelSelector = (day) => day;
    this.aggregate = aggregateFunction;
    Array.from({ length: this.daysInMonth }, (_, i) => (i + 1).toString());
  }

  public setWeekConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === this.currentYear &&
      getWeekNumber(dateSelector(item)) === this.currentWeek;
    this.groupSelector = (current) => dateSelector(current).getDay();
    this.labelSelector = (weekdayIx) => weekdays[+weekdayIx];
    this.aggregate = aggregateFunction;
  }

  public setDayConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === this.currentYear &&
      dateSelector(item).getMonth() === this.currentMonth &&
      getWeekNumber(dateSelector(item)) === this.currentWeek &&
      dateSelector(item).getDay() === this.currentDay;
    this.groupSelector = (current) => dateSelector(current).getHours();
    this.labelSelector = (hour) => hour;
    this.aggregate = aggregateFunction;
  }

  public sumAggregate = (
    selector: (item: T) => number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): ((items: T[]) => any) => {
    return (items: T[]): number =>
      items.reduce((sum, current) => sum + selector(current), 0);
  };
}
