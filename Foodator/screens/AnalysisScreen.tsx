import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnalysisScreenProps } from '../types';
import {
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import { dateTimeReviver, mealHistoryMock } from '../other';
import { MealHistory } from '../models/collections';
import {
  ChartLayoutConfig,
  ChartDataProcessor,
  ChartDataProcessorConfig,
  ColorPicker,
  ChartDataPoint,
} from '../structures';
import { MealHistoryEntry } from '../models/entities';

const mealRawData: MealHistory = JSON.parse(mealHistoryMock, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  const mode: 'week' | 'month' | 'year' = 'week';
  const {
    dataConfig: mealDataConfig,
    layoutConfig: mealChartLayoutConfig,
  } = getMealChartConfigs(mode);

  const mealChartData = new ChartDataProcessor<
    MealHistoryEntry,
    ChartDataPoint
  >(mealDataConfig, mealRawData.values);
  return (
    <View style={styles.container}>
      <Text>{mealChartLayoutConfig.title}</Text>
      <VictoryChart
        height={400}
        theme={VictoryTheme.material}
        domainPadding={30}
      >
        <VictoryAxis
          crossAxis
          fixLabelOverlap
          tickValues={mealChartLayoutConfig.xTicks()}
          tickFormat={mealChartLayoutConfig.xTickFormatter}
        />
        <VictoryAxis
          dependentAxis
          fixLabelOverlap
          tickValues={mealChartLayoutConfig.yTicks()}
          tickFormat={mealChartLayoutConfig.yTickFormatter}
        />
        <VictoryScatter
          data={mealChartData.data}
          x="x"
          y="y.time"
          size={mealChartLayoutConfig.dataSize}
          style={{
            data: {
              fill: ({ datum }) => ColorPicker.getColor(datum.y.foodId),
              transform: ({}) =>
                `translate(${mealChartLayoutConfig.jitterX()}, ${mealChartLayoutConfig.jitterY()})`,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function getMealChartConfigs(mode: string) {
  const layoutConfig = new ChartLayoutConfig();
  const dataConfig = new ChartDataProcessorConfig<
    MealHistoryEntry,
    ChartDataPoint
  >();
  const dateSelector = (m: MealHistoryEntry) => m.datetime;
  const aggregate = dataConfig.valueAggregate((m) =>
    m.values.map((food) => {
      const time = m.datetime.getHours() + m.datetime.getMinutes() / 60;
      return { time, foodId: food.foodId };
    })
  );

  switch (mode) {
    case 'year':
      layoutConfig.setYearConfig();
      dataConfig.setYearConfig(dateSelector, aggregate);
      break;
    case 'month':
      layoutConfig.setMonthConfig();
      dataConfig.setMonthConfig(dateSelector, aggregate);
      break;
    case 'week':
      layoutConfig.setWeekConfig();
      dataConfig.setWeekConfig(dateSelector, aggregate);
      break;
    default:
      break;
  }

  return {
    dataConfig,
    layoutConfig,
  };
}
