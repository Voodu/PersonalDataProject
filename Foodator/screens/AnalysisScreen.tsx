import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnalysisScreenProps } from '../types';
import {
  VictoryAxis,
  VictoryBar,
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
  Time,
} from '../structures';
import { MealHistoryEntry } from '../models/entities';

const rawData: MealHistory = JSON.parse(mealHistoryMock, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  const mode: 'day' | 'week' | 'month' | 'year' = 'month';
  const { dataProcessorConfig, chartLayoutConfig } = getChartConfigs(mode);

  const chartData = new ChartDataProcessor<MealHistoryEntry>(
    dataProcessorConfig,
    rawData.values
  );
  return (
    <View style={styles.container}>
      <Text>{`${Time.currentDay}.${Time.currentMonth}.${Time.currentYear}, week: ${Time.currentWeek}`}</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={30}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.x}, ${datum.y}`}
          />
        }
      >
        <VictoryAxis
          crossAxis
          fixLabelOverlap
          tickValues={chartLayoutConfig.xTicks()}
          tickFormat={chartLayoutConfig.xTickFormatter}
        />
        <VictoryAxis
          dependentAxis
          fixLabelOverlap
          tickValues={chartLayoutConfig.yTicks()}
          tickFormat={chartLayoutConfig.yTickFormatter}
        />
        <VictoryScatter
          data={chartData.data}
          style={{ data: { width: chartLayoutConfig.lineWidth } }}
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
  const chartLayoutConfig = new ChartLayoutConfig();
  const dataProcessorConfig = new ChartDataProcessorConfig<MealHistoryEntry>();
  const dateSelector = (m: MealHistoryEntry) => m.datetime;
  const aggregate = dataProcessorConfig.sumAggregate((m) => m.values.length);
  switch (mode) {
    case 'year':
      chartLayoutConfig.setYearConfig();
      dataProcessorConfig.setYearConfig(dateSelector, aggregate);
      break;
    case 'month':
      chartLayoutConfig.setMonthConfig();
      dataProcessorConfig.setMonthConfig(dateSelector, aggregate);
      break;
    case 'week':
      chartLayoutConfig.setWeekConfig();
      dataProcessorConfig.setWeekConfig(dateSelector, aggregate);
      break;
    case 'day':
      chartLayoutConfig.setDayConfig();
      dataProcessorConfig.setDayConfig(dateSelector, aggregate);
      break;
    default:
      break;
  }
  dataProcessorConfig.groupSelector = (current) => current.datetime.getHours();
  return { dataProcessorConfig, chartLayoutConfig };
}
