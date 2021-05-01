import { ChartDataProcessorConfig } from './ChartDataProcessorConfig';

export class ChartDataProcessor<T> {
  data: DataPoint[] = [];
  constructor(config: ChartDataProcessorConfig<T>, values: T[]) {
    const dataInRange = values.filter(config.filter);
    const grouped = dataInRange.reduce(config.group, {});
    const x = Object.keys(grouped).map(config.labelSelector);
    const y = Object.values(grouped).map(config.aggregate);

    if (x.length != y.length) {
      throw new Error(
        `x and y arrays must have the same lenght. Now x.length = ${x.length}; y.length = ${y.length}`
      );
    }

    for (let i = 0; i < x.length; i++) {
      this.data.push({ x: x[i], y: y[i] });
    }
  }
}

interface DataPoint {
  x: unknown;
  y: unknown;
}
