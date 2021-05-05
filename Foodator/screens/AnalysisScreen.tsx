import * as React from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AnalysisScreenProps } from '../types';
import {
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import { dateTimeReviver, foodCatalogueMock, mealHistoryMock } from '../other';
import { FoodCatalogue, MealHistory } from '../models/collections';
import {
  ChartLayoutConfig,
  ChartDataProcessor,
  ChartDataProcessorConfig,
  ColorPicker,
  ChartDataPoint,
  Time,
  GroupFunction,
  Accumulator,
  DataPoint,
} from '../structures';
import { FoodCatalogueEntry, MealHistoryEntry } from '../models/entities';
import {
  ExpandableListElement,
  ExpandableListElementItem,
  RegularText,
  SmallButton,
} from '../components';

const mealHistoryRawData: MealHistory = JSON.parse(
  mealHistoryMock,
  dateTimeReviver
);
const foodCatalogueRawData: FoodCatalogue = JSON.parse(
  foodCatalogueMock,
  dateTimeReviver
);

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
  const [mealChartData, setMealChartData] = React.useState<
    DataPoint<ChartDataPoint>[]
  >([]);

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

  const legendContent = generateLegendContent(
    new ChartDataProcessor<MealHistoryEntry, ChartDataPoint>(
      mealDataConfig,
      mealHistoryRawData.values
    ).data
  );

  const [legendDataSource, setLegendDataSource] = React.useState(legendContent);
  const [selectedFoods, setSelectedFoods] = React.useState<number[]>([]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLegendAndSelectedFoods = (
    legendData: ExpandableListElementItem[]
  ) => {
    const mealChartData = new ChartDataProcessor<
      MealHistoryEntry,
      ChartDataPoint
    >(mealDataConfig, mealHistoryRawData.values).data;
    setLegendDataSource(legendData.sort(legendOrdering));
    const selectedCategories = legendData.filter((x) => x.isSelected);
    const selectedFoodIds = legendData
      .map((x) =>
        x.subcategory
          .filter((y) => y.isSelected && !x.isSelected)
          .map((x) => x.id)
      )
      .flat();
    setSelectedFoods([...selectedFoodIds]);

    const finalFoods: DataPoint<ChartDataPoint>[] = [];
    for (const meal of mealChartData) {
      for (const category of selectedCategories) {
        for (const food of category.subcategory) {
          if (meal.y.foodId === food.id) {
            finalFoods.push({
              x: meal.x,
              y: { foodId: category.categoryName, time: meal.y.time },
            });
          }
        }
      }
    }

    finalFoods.push(
      ...mealChartData.filter((x) =>
        selectedFoodIds.some((selected) => selected === x.y.foodId)
      )
    );
    setMealChartData(finalFoods);
  };

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...legendDataSource];

    array.forEach((value, placeindex) =>
      placeindex === index
        ? (value.isExpanded = !value.isExpanded)
        : (value.isExpanded = false)
    );

    updateLegendAndSelectedFoods(array);
  };

  const setView = (mode: string) => {
    setMode(mode);
    const configs = generateMealChartConfigs(mode, time);
    setMealDataConfig(configs.dataConfig);
    setMealChartLayoutConfig(configs.layoutConfig);
    const mealChartData = new ChartDataProcessor<
      MealHistoryEntry,
      ChartDataPoint
    >(configs.dataConfig, mealHistoryRawData.values).data;
    setMealChartData(mealChartData);

    updateLegendAndSelectedFoods(generateLegendContent(mealChartData));
  };
  const updateLegendData = () => {
    updateLegendAndSelectedFoods(legendDataSource);
  };
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <RegularText style={styles.chartTitleText}>
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
            data={mealChartData}
            x="x"
            y="y.time"
            size={mealChartLayoutConfig.dataSize}
            style={{
              data: {
                fill: ({ datum }) => ColorPicker.getColor(datum.y.foodId),
                transform: ({ datum }) =>
                  `translate(${mealChartLayoutConfig.jitterX(
                    datum.y.foodId
                  )}, ${mealChartLayoutConfig.jitterY(datum.y.foodId)})`,
              },
            }}
          />
        </VictoryChart>
      </View>
      <View style={styles.legendContainer}>
        <ScrollView style={{ width: '100%' }}>
          {legendDataSource.map((item, key) => (
            <ExpandableListElement
              key={item.categoryName}
              onExpand={() => {
                updateLayout(key);
              }}
              onSelected={updateLegendData}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  chartTitleText: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
  legendContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 500,
  },
  legendTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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

function legendOrdering(
  a: ExpandableListElementItem,
  b: ExpandableListElementItem
): 1 | -1 {
  if (a.isSelected && !b.isSelected) return -1;
  if (!a.isSelected && b.isSelected) return 1;
  return a.categoryName > b.categoryName ? 1 : -1;
}

function generateLegendContent(data: DataPoint<ChartDataPoint>[]) {
  const foods: FoodCatalogueEntry[] | undefined = [];
  // Go over all data.y values.
  // For every, go through FoodCatalogue and take food catalogue entry if FC = data.y.foodid
  for (const point of data) {
    const food = foodCatalogueRawData.values.find(
      (catalogueEntry) => point.y.foodId === catalogueEntry.foodId
    );
    if (food && !foods.some((f) => f.foodId == food.foodId)) {
      foods.push(food);
    }
  }
  // Group obtained array by x.category
  const group: GroupFunction<FoodCatalogueEntry> = (
    acc: Accumulator<FoodCatalogueEntry>,
    current: FoodCatalogueEntry
  ) => {
    const i = current.category;
    acc[i] = acc[i] ? acc[i].concat(current) : [current];
    return acc;
  };
  const grouped = foods.reduce(group, {});
  // Map to legendContent interface
  const legendContent: ExpandableListElementItem[] = [];
  for (const category in grouped) {
    if (Object.prototype.hasOwnProperty.call(grouped, category)) {
      const foods = grouped[category];
      legendContent.push({
        isExpanded: false,
        isSelected: false,
        categoryName: category,
        subcategory: foods.map((food) => {
          return {
            id: food.foodId,
            text: food.name,
            isSelected: false,
          };
        }),
      });
    }
  }
  return legendContent.sort(legendOrdering);
}
