import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
  Time,
} from '../structures';
import { MealHistoryEntry } from '../models/entities';
import { RegularText, SmallButton } from '../components';

const mealRawData: MealHistory = JSON.parse(mealHistoryMock, dateTimeReviver);

export function AnalysisScreen({}: AnalysisScreenProps): React.ReactElement {
  // TODO: Use current date
  const [time] = React.useState(new Time(new Date(2021, 3, 12, 22, 35)));
  const [mode, setMode] = React.useState('week');
  const configs = generateMealChartConfigs(mode, time);
  const [mealDataConfig, setMealDataConfig] = React.useState(
    configs.dataConfig
  );
  const [mealChartLayoutConfig, setMealChartLayoutConfig] = React.useState(
    configs.layoutConfig
  );

  const setView = (mode: string) => {
    setMode(mode);
    const configs = generateMealChartConfigs(mode, time);
    setMealDataConfig(configs.dataConfig);
    setMealChartLayoutConfig(configs.layoutConfig);
  };

  const changeDate = (diff: -1 | 0 | 1) => {
    switch (mode) {
      case 'week':
        time.changeWeek(diff);
        setView(mode);
        break;
      case 'month':
        time.changeMonth(diff);
        setView(mode);
        break;
      case 'year':
        time.changeYear(diff);
        setView(mode);
        break;
    }
  };

  const mealChartData = new ChartDataProcessor<
    MealHistoryEntry,
    ChartDataPoint
  >(mealDataConfig, mealRawData.values);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.chartContainer}>
        <View style={styles.topContainer}>
          <RegularText style={styles.titleText}>
            {mealChartLayoutConfig.title}
          </RegularText>
          <SmallButton
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onPress={() => changeDate(-1)}
          >
            <AntDesign name="left" size={16} color="white" />
          </SmallButton>
          <SmallButton
            style={{ borderRadius: 0 }}
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
            style={{ borderRadius: 0 }}
            onPress={() => setView('year')}
          >
            Year
          </SmallButton>
          <SmallButton
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            onPress={() => changeDate(1)}
          >
            <AntDesign name="right" size={16} color="white" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  titleText: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

function generateMealChartConfigs(mode: string, time: Time) {
  const layoutConfig = new ChartLayoutConfig(time);
  const dataConfig = new ChartDataProcessorConfig<
    MealHistoryEntry,
    ChartDataPoint
  >(time);
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
