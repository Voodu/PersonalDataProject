import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnalysisScreenProps } from '../types';
import {
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory-native';
import { dateTimeReviver, mealHistoryMock } from '../other';
import { MealHistory } from '../models/collections';
import {
  ChartLayoutConfig,
  ChartDataProcessor,
  ChartDataProcessorConfig,
} from '../structures';
import { MealHistoryEntry } from '../models/entities';

const mealRawData: MealHistory = JSON.parse(mealHistoryMock, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  const mode: 'day' | 'week' | 'month' | 'year' = 'month';
  const {
    processorConfig: mealDataProcessorConfig,
    layoutConfig: mealChartLayoutConfig,
  } = getChartConfigs(mode);

  const mealChartData = new ChartDataProcessor<MealHistoryEntry>(
    mealDataProcessorConfig,
    mealRawData.values
  );
  return (
    <View style={styles.container}>
      <Text>{mealChartLayoutConfig.title}</Text>
      <VictoryChart
        height={400}
        theme={VictoryTheme.material}
        domainPadding={30}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.x}, ${getHourClock(datum.y)}`}
          />
        }
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
          style={{ data: { width: mealChartLayoutConfig.lineWidth } }}
          // y="y.time"
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

function getChartConfigs(mode: string) {
  const layoutConfig = new ChartLayoutConfig();
  const processorConfig = new ChartDataProcessorConfig<MealHistoryEntry>();
  const dateSelector = (m: MealHistoryEntry) => m.datetime;
  const aggregate = processorConfig.valueAggregate((m) =>
    m.values.map(() => m.datetime.getHours() + m.datetime.getMinutes() / 60)
  );

  switch (mode) {
    case 'year':
      layoutConfig.setYearConfig();
      processorConfig.setYearConfig(dateSelector, aggregate);
      break;
    case 'month':
      layoutConfig.setMonthConfig();
      processorConfig.setMonthConfig(dateSelector, aggregate);
      break;
    case 'week':
      layoutConfig.setWeekConfig();
      processorConfig.setWeekConfig(dateSelector, aggregate);
      break;
    case 'day':
      layoutConfig.setDayConfig();
      processorConfig.setDayConfig(dateSelector, aggregate);
      break;
    default:
      break;
  }

  return {
    processorConfig,
    layoutConfig,
  };
}

function getHourClock(hourDecimal: number): string {
  return `${Math.floor(hourDecimal)}:${(
    (hourDecimal - Math.floor(hourDecimal)) *
    60
  )
    .toFixed(0)
    .padStart(2, '0')}`;
}
