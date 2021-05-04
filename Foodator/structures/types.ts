export type Accumulator<T> = {
  [name: number]: T[];
};
export type FilterFunction<TRaw> = (item: TRaw) => boolean;
export type LabelSelectorFunction = (label: string) => string;
export type GroupSelectorFunction<TRaw> = (
  current: TRaw
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => number | string | any;
export type AggregateFunction<TRaw, TPlotted> = (
  items: TRaw[]
) => TPlotted | TPlotted[];
export type GroupFunction<TRaw> = (
  acc: Accumulator<TRaw>,
  current: TRaw
) => Accumulator<TRaw>;

export type TicksFunction = () => string[];
export type TickFormatter =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[] | { (tick: any, index: number, ticks: any[]): string | number };
