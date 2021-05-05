import { ChartDataProcessorConfig } from './ChartDataProcessorConfig';

export class ChartDataProcessor<TRaw, TPlotted> {
  public data: DataPoint<TPlotted>[] = [];
  constructor(
    config: ChartDataProcessorConfig<TRaw, TPlotted>,
    values: TRaw[]
  ) {
    const dataInRange = values.filter(config.filter);
    const grouped = dataInRange.reduce(config.group, {});
    let xLabels = Object.keys(grouped).map(config.labelSelector);
    let yValues = Object.values(grouped).map(config.aggregate);

    if (xLabels.length != yValues.length) {
      throw new Error(
        `x and y arrays must have the same lenght. Now x.length = ${xLabels.length}; y.length = ${yValues.length}`
      );
    }

    if (yValues && Array.isArray(yValues[0])) {
      xLabels = this.expandXLabels(xLabels, yValues);
      yValues = this.deepFlatten(yValues) as TPlotted[];
    }

    for (let i = 0; i < xLabels.length; i++) {
      this.data.push({ x: xLabels[i], y: yValues[i] as TPlotted });
    }
  }

  private expandXLabels(xLabels: string[], yValues: (TPlotted | TPlotted[])[]) {
    const output = [];
    for (let labelIx = 0; labelIx < xLabels.length; labelIx++) {
      const yFlat = this.deepFlatten(yValues[labelIx] as unknown[]);
      for (let j = 0; j < yFlat.length; j++) {
        output.push(xLabels[labelIx]);
      }
    }
    return output;
  }

  private deepFlatten(array: unknown[]): unknown[] {
    return array.reduce((acc: unknown[], e: unknown) => {
      if (Array.isArray(e)) {
        // if the element is an array, fall flatten on it again and then take the returned value and concat it.
        return acc.concat(this.deepFlatten(e));
      } else {
        // otherwise just concat the value.
        return acc.concat(e);
      }
    }, []); // initial value for the accumulator is []
  }
}

export interface DataPoint<T> {
  x: unknown;
  y: T;
}
