import { Time } from './Time';
import {
  FilterFunction,
  GroupSelectorFunction,
  LabelSelectorFunction,
  AggregateFunction,
  GroupFunction,
} from './types';

export class ChartDataProcessorConfig<TRaw, TPlotted> {
  public filter: FilterFunction<TRaw> = () => true;
  public groupSelector: GroupSelectorFunction<TRaw> = (items) => items;
  public labelSelector: LabelSelectorFunction = (label) => label;
  public aggregate: AggregateFunction<TRaw, TPlotted> = () => [];

  public group: GroupFunction<TRaw> = (acc, current) => {
    const i = this.groupSelector(current);
    acc[i] = acc[i] ? acc[i].concat(current) : [current];
    return acc;
  };

  public setYearConfig(
    dateSelector: (item: TRaw) => Date,
    aggregateFunction: AggregateFunction<TRaw, TPlotted>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear;
    this.groupSelector = (current) => dateSelector(current).getMonth();
    this.labelSelector = (monthIx) => Time.months[+monthIx];
    this.aggregate = aggregateFunction;
  }

  public setMonthConfig(
    dateSelector: (item: TRaw) => Date,
    aggregateFunction: AggregateFunction<TRaw, TPlotted>
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
    dateSelector: (item: TRaw) => Date,
    aggregateFunction: AggregateFunction<TRaw, TPlotted>
  ): void {
    this.filter = (item) =>
      dateSelector(item).getFullYear() === Time.currentYear &&
      Time.getWeekNumber(dateSelector(item)) === Time.currentWeek;
    this.groupSelector = (current) => dateSelector(current).getDay();
    this.labelSelector = (weekdayIx) => Time.weekdays[+weekdayIx];
    this.aggregate = aggregateFunction;
  }

  public sumAggregate = (
    selector: (item: TRaw) => number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): ((items: TRaw[]) => any) => {
    return (items: TRaw[]): number =>
      items.reduce((sum, current) => sum + selector(current), 0);
  };

  public valueAggregate = (
    selector: (item: TRaw) => TPlotted | TPlotted[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): ((items: TRaw[]) => any) => {
    return (items) => items.map((current) => selector(current));
  };
}
