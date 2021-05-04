export type Accumulator<T> = {
  [name: number]: T[];
};
export type FilterFunction<T> = (item: T) => boolean;
export type LabelSelectorFunction = (label: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GroupSelectorFunction<T> = (current: T) => number | string | any;
export type AggregateFunction<T> = (items: T[]) => number | number[];
export type GroupFunction<T> = (
  acc: Accumulator<T>,
  current: T
) => Accumulator<T>;

export type TicksFunction = () => string[];
export type TickFormatter =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[] | { (tick: any, index: number, ticks: any[]): string | number };
