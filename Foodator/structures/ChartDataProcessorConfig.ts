import { Time } from './Time';

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
  public filter: FilterFunction<T> = () => true;
  public groupSelector: GroupSelectorFunction<T> = (items) => items;
  public labelSelector: LabelSelectorFunction = (label) => label;
  public aggregate: AggregateFunction<T> = () => 0;

  public group: GroupFunction<T> = (acc: TAgg<T>, current: T) => {
    const i = this.groupSelector(current);
    acc[i] = acc[i] ? acc[i].concat(current) : [current];
    return acc;
  };

  public setYearConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear;
    this.groupSelector = (current) => dateSelector(current).getMonth();
    this.labelSelector = (monthIx) => Time.months[+monthIx];
    this.aggregate = aggregateFunction;
  }

  public setMonthConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear &&
      dateSelector(item).getMonth() === Time.currentMonth;
    this.groupSelector = (current) => dateSelector(current).getDate();
    this.labelSelector = (day) => day;
    this.aggregate = aggregateFunction;
    Array.from({ length: Time.daysInMonth }, (_, i) => (i + 1).toString());
  }

  public setWeekConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear &&
      Time.getWeekNumber(dateSelector(item)) === Time.currentWeek;
    this.groupSelector = (current) => dateSelector(current).getDay();
    this.labelSelector = (weekdayIx) => Time.weekdays[+weekdayIx];
    this.aggregate = aggregateFunction;
  }

  public setDayConfig(
    dateSelector: (item: T) => Date,
    aggregateFunction: AggregateFunction<T>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear &&
      dateSelector(item).getMonth() === Time.currentMonth &&
      Time.getWeekNumber(dateSelector(item)) === Time.currentWeek &&
      dateSelector(item).getDay() === Time.currentDay;
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
