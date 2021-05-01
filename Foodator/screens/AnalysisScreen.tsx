import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnalysisScreenProps } from '../types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory-native';
import { dateTimeReviver, mockRootData } from '../other';
import { Root } from '../models/collections';
import {
  ChartLayoutConfig,
  ChartDataProcessor,
  ChartDataProcessorConfig,
} from '../structures';
import { MealHistoryEntry } from '../models/entities';

const rawData: Root = JSON.parse(mockRootData, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  const mode: 'day' | 'week' | 'month' | 'year' = 'day';
  const { dataProcessorConfig, chartLayoutConfig } = getChartConfigs(mode);

  const chartData = new ChartDataProcessor<MealHistoryEntry>(
    dataProcessorConfig,
    rawData.mealHistory.values
  );
  return (
    <View style={styles.container}>
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
          tickValues={chartLayoutConfig.ticks()}
          tickFormat={chartLayoutConfig.tickFormatter}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
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
  const selector = (m: MealHistoryEntry) => m.datetime;
  const aggregate = dataProcessorConfig.sumAggregate((m) => m.food.length);
  switch (mode) {
    case 'year':
      chartLayoutConfig.setYearConfig();
      dataProcessorConfig.setYearConfig(selector, aggregate);
      break;
    case 'month':
      chartLayoutConfig.setMonthConfig();
      dataProcessorConfig.setMonthConfig(selector, aggregate);
      break;
    case 'week':
      chartLayoutConfig.setWeekConfig();
      dataProcessorConfig.setWeekConfig(selector, aggregate);
      break;
    case 'day':
      chartLayoutConfig.setDayConfig();
      dataProcessorConfig.setDayConfig(selector, aggregate);
      break;
    default:
      break;
  }
  return { dataProcessorConfig, chartLayoutConfig };
}
