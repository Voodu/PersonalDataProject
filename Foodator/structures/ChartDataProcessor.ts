import { ChartDataProcessorConfig } from './ChartDataProcessorConfig';

export class ChartDataProcessor<T> {
  public data: DataPoint[] = [];
  constructor(config: ChartDataProcessorConfig<T>, values: T[]) {
    const dataInRange = values.filter(config.filter);
    const grouped = dataInRange.reduce(config.group, {});
    let xLabels = Object.keys(grouped).map(config.labelSelector);
    let yValues = Object.values(grouped).map(config.aggregate);

    if (yValues && Array.isArray(yValues[0])) {
      xLabels = this.expandXLabels(xLabels, yValues);
      yValues = yValues.flat();
    }

    if (xLabels.length != yValues.length) {
      throw new Error(
        `x and y arrays must have the same lenght. Now x.length = ${xLabels.length}; y.length = ${yValues.length}`
      );
    }

    for (let i = 0; i < xLabels.length; i++) {
      this.data.push({ x: xLabels[i], y: yValues[i] });
    }
  }

  private expandXLabels(xLabels: string[], yValues: (number | number[])[]) {
    const output = [];
    for (let labelIx = 0; labelIx < xLabels.length; labelIx++) {
      for (let j = 0; j < (yValues[labelIx] as number[]).length; j++) {
        output.push(xLabels[labelIx]);
      }
    }
    xLabels = output;
    return xLabels;
  }
}

interface DataPoint {
  x: unknown;
  y: unknown;
}
