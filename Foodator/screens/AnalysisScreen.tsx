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
import { RegularText, SmallButton } from '../components';

const mealRawData: MealHistory = JSON.parse(mealHistoryMock, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  const configs = generateMealChartConfigs('week');
  const [mealDataConfig, setMealDataConfig] = React.useState(
    configs.dataConfig
  );
  const [mealChartLayoutConfig, setMealChartLayoutConfig] = React.useState(
    configs.layoutConfig
  );

  const setView = (mode: string) => {
    const configs = generateMealChartConfigs(mode);
    setMealDataConfig(configs.dataConfig);
    setMealChartLayoutConfig(configs.layoutConfig);
    console.log('changed view to', mode);
  };

  const mealChartData = new ChartDataProcessor<
    MealHistoryEntry,
    ChartDataPoint
  >(mealDataConfig, mealRawData.values);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <RegularText style={styles.titleText}>
          {mealChartLayoutConfig.title}
        </RegularText>
        <SmallButton
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onPress={() => setView('week')}
        >
          Week
        </SmallButton>
        <SmallButton
          style={{ borderRadius: 0 }}
          onPress={() => setView('month')}
        >
          Month
        </SmallButton>
        <SmallButton
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onPress={() => setView('year')}
        >
          Year
        </SmallButton>
      </View>
      <VictoryChart
        padding={{ left: 50, right: 50, top: 10, bottom: 50 }}
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
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  titleText: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

function generateMealChartConfigs(mode: string) {
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
