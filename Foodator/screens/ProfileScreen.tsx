import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
} from 'victory-native';
import {
  ExpandableListElementItem,
  RegularText,
  SmallButton,
  ExpandableListElement,
} from '../components';
import {
  MealHistory,
  FoodCatalogue,
  SymptomsHistory,
  SymptomsCatalogue,
} from '../models/collections';
import {
  MealHistoryEntry,
  SymptomHistoryEntry,
  FoodCatalogueEntry,
  SymptomCatalogueEntry,
} from '../models/entities';
import {
  mealHistoryMock,
  dateTimeReviver,
  foodCatalogueMock,
  symptomsHistoryMock,
  symptomsCatalogueMock,
} from '../other';
import {
  Time,
  DataPoint,
  ChartDataPoint,
  ChartDataProcessor,
  MarkerStylingPicker,
  ChartLayoutConfig,
  ChartDataProcessorConfig,
  GroupFunction,
  Accumulator,
} from '../structures';
import { ProfileScreenProps } from '../types';

const mealHistoryRawData: MealHistory = JSON.parse(
  mealHistoryMock,
  dateTimeReviver
);
const foodCatalogueRawData: FoodCatalogue = JSON.parse(
  foodCatalogueMock,
  dateTimeReviver
);
const symptomsHistoryRawData: SymptomsHistory = JSON.parse(
  symptomsHistoryMock,
  dateTimeReviver
);
const symptomsCatalogueRawData: SymptomsCatalogue = JSON.parse(
  symptomsCatalogueMock,
  dateTimeReviver
);

export function ProfileScreen({}: ProfileScreenProps): React.ReactElement {
  // TODO: Use current date

  const [time] = React.useState(new Time(new Date(2021, 3, 12, 22, 35)));
  const [mode, setMode] = React.useState('week');
  const mealConfigs = generateMealChartConfigs(mode, time);
  const symptomConfigs = generateSymptomsChartConfigs(mode, time);
  const [mealDataConfig, setMealDataConfig] = React.useState(
    mealConfigs.dataConfig
  );
  const [symptomDataConfig, setSymptomDataConfig] = React.useState(
    symptomConfigs.dataConfig
  );
  const [layoutConfig, setLayoutConfig] = React.useState(
    mealConfigs.layoutConfig
  );
  const [mealChartData, setMealChartData] = React.useState<
    DataPoint<ChartDataPoint>[]
  >([]);
  const [symptomChartData, setSymptomChartData] = React.useState<
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

  const mealLegendContent = generateMealLegendContent(
    new ChartDataProcessor<MealHistoryEntry, ChartDataPoint>(
      mealDataConfig,
      mealHistoryRawData.values
    ).data
  );
  const symptomsLegendContent = generateSymptomsLegendContent(
    new ChartDataProcessor<SymptomHistoryEntry, ChartDataPoint>(
      symptomDataConfig,
      symptomsHistoryRawData.values
    ).data
  );

  const [mealLegendDataSource, setMealLegendDataSource] = React.useState(
    mealLegendContent
  );
  const [
    symptomsLegendDataSource,
    setSymptomsLegendDataSource,
  ] = React.useState(symptomsLegendContent);
  const [selectedFoods, setSelectedFoods] = React.useState<number[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<number[]>([]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateMealLegendAndSelectedFoods = (
    legendData: ExpandableListElementItem[]
  ) => {
    const mealChartData = new ChartDataProcessor<
      MealHistoryEntry,
      ChartDataPoint
    >(mealDataConfig, mealHistoryRawData.values).data;
    setMealLegendDataSource(legendData.sort(legendOrdering));
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
          if (meal.y.pointId === food.id) {
            finalFoods.push({
              x: meal.x,
              y: { pointId: category.categoryName, time: meal.y.time },
            });
          }
        }
      }
    }

    finalFoods.push(
      ...mealChartData.filter((x) =>
        selectedFoodIds.some((selected) => selected === x.y.pointId)
      )
    );
    setMealChartData(finalFoods);
  };
  const updateSymptomsLegendAndSelectedSymptoms = (
    legendData: ExpandableListElementItem[]
  ) => {
    const symptomsChartData = new ChartDataProcessor<
      SymptomHistoryEntry,
      ChartDataPoint
    >(symptomDataConfig, symptomsHistoryRawData.values).data;
    setSymptomsLegendDataSource(legendData);
    const selectedCategories = legendData.filter((x) => x.isSelected);
    const selectedSymptomIds = legendData
      .map((x) =>
        x.subcategory
          .filter((y) => y.isSelected && !x.isSelected)
          .map((x) => x.id)
      )
      .flat();
    setSelectedSymptoms([...selectedSymptomIds]);

    const finalSymptoms: DataPoint<ChartDataPoint>[] = [];
    for (const symptoms of symptomsChartData) {
      for (const category of selectedCategories) {
        for (const symptom of category.subcategory) {
          if (symptoms.y.pointId === symptom.id) {
            finalSymptoms.push({
              x: symptoms.x,
              y: { pointId: category.categoryName, time: symptoms.y.time },
            });
          }
        }
      }
    }

    finalSymptoms.push(
      ...symptomsChartData.filter((x) =>
        selectedSymptomIds.some((selected) => selected === x.y.pointId)
      )
    );
    setSymptomChartData(finalSymptoms);
  };

  const updateMealLegendLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...mealLegendDataSource];

    array.forEach((value, placeindex) =>
      placeindex === index
        ? (value.isExpanded = !value.isExpanded)
        : (value.isExpanded = false)
    );

    updateMealLegendAndSelectedFoods(array);
  };
  const updateSymptomsLegendLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...symptomsLegendDataSource];

    array.forEach((value, placeindex) =>
      placeindex === index
        ? (value.isExpanded = !value.isExpanded)
        : (value.isExpanded = false)
    );

    updateSymptomsLegendAndSelectedSymptoms(array);
  };

  const setView = (mode: string) => {
    setMode(mode);

    const mealConfigs = generateMealChartConfigs(mode, time);
    setMealDataConfig(mealConfigs.dataConfig);
    setLayoutConfig(mealConfigs.layoutConfig);
    const mealChartData = new ChartDataProcessor<
      MealHistoryEntry,
      ChartDataPoint
    >(mealConfigs.dataConfig, mealHistoryRawData.values).data;
    setMealChartData(mealChartData);
    updateMealLegendAndSelectedFoods(generateMealLegendContent(mealChartData));

    const symptomsConfigs = generateSymptomsChartConfigs(mode, time);
    setSymptomDataConfig(symptomsConfigs.dataConfig);
    const symptomsChartData = new ChartDataProcessor<
      SymptomHistoryEntry,
      ChartDataPoint
    >(symptomsConfigs.dataConfig, symptomsHistoryRawData.values).data;
    setSymptomChartData(symptomsChartData);
    updateSymptomsLegendAndSelectedSymptoms(
      generateSymptomsLegendContent(symptomsChartData)
    );
  };
  const updateMealLegendData = () => {
    updateMealLegendAndSelectedFoods(mealLegendDataSource);
  };
  const updateSymptomsLegendData = () => {
    updateSymptomsLegendAndSelectedSymptoms(symptomsLegendDataSource);
  };
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <RegularText style={styles.chartTitleText}>
            {layoutConfig.title}
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
            tickValues={layoutConfig.xTicks()}
            tickFormat={layoutConfig.xTickFormatter}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            tickValues={layoutConfig.yTicks()}
            tickFormat={layoutConfig.yTickFormatter}
          />
          <VictoryScatter
            data={mealChartData}
            x="x"
            y="y.time"
            size={layoutConfig.dataSize}
            style={{
              data: {
                fill: ({ datum }) =>
                  MarkerStylingPicker.getColor(datum.y.pointId),
                transform: ({ datum }) =>
                  `translate(${layoutConfig.jitterX(
                    datum.y.pointId
                  )}, ${layoutConfig.jitterY(datum.y.pointId)})`,
              },
            }}
            symbol={({ datum }) =>
              MarkerStylingPicker.getSymbol(datum.y.pointId)
            }
          />
          <VictoryScatter
            data={symptomChartData}
            x="x"
            y="y.time"
            size={layoutConfig.dataSize}
            style={{
              data: {
                fill: ({ datum }) =>
                  MarkerStylingPicker.getColor(datum.y.pointId),
                transform: ({ datum }) =>
                  `translate(${layoutConfig.jitterX(
                    datum.y.pointId
                  )}, ${layoutConfig.jitterY(datum.y.pointId)})`,
              },
            }}
            symbol={({ datum }) => {
              return MarkerStylingPicker.getSymbol(datum.y.pointId);
            }}
          />
        </VictoryChart>
      </View>
      <View style={styles.legendContainer}>
        <ScrollView style={{ width: '100%' }}>
          {symptomsLegendDataSource.map((item, key) => (
            <ExpandableListElement
              key={item.categoryName}
              onExpand={() => {
                updateSymptomsLegendLayout(key);
              }}
              onSelected={updateSymptomsLegendData}
              item={item}
            />
          ))}
        </ScrollView>
        <ScrollView style={{ width: '100%' }}>
          {mealLegendDataSource.map((item, key) => (
            <ExpandableListElement
              key={item.categoryName}
              onExpand={() => {
                updateMealLegendLayout(key);
              }}
              onSelected={updateMealLegendData}
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
      return { time, pointId: food.foodId };
    })
  );

  setDateConfig(mode, layoutConfig, dataConfig, dateSelector, aggregate);

  return {
    dataConfig,
    layoutConfig,
  };
}

function generateSymptomsChartConfigs(mode: string, time: Time) {
  const layoutConfig = new ChartLayoutConfig(time);
  const dataConfig = new ChartDataProcessorConfig<
    SymptomHistoryEntry,
    ChartDataPoint
  >(time);
  const dateSelector = (s: SymptomHistoryEntry) => s.datetime;
  const aggregate = dataConfig.valueAggregate((s) => {
    const time = s.datetime.getHours() + s.datetime.getMinutes() / 60;
    return { time, pointId: s.symptomId };
  });

  setDateConfig(mode, layoutConfig, dataConfig, dateSelector, aggregate);

  return {
    dataConfig,
    layoutConfig,
  };
}

function setDateConfig<T>(
  mode: string,
  layoutConfig: ChartLayoutConfig,
  dataConfig: ChartDataProcessorConfig<T, ChartDataPoint>,
  dateSelector: (m: T) => Date,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aggregate: (items: T[]) => any
) {
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
}

function legendOrdering(
  a: ExpandableListElementItem,
  b: ExpandableListElementItem
): 1 | -1 {
  if (a.isSelected && !b.isSelected) return -1;
  if (!a.isSelected && b.isSelected) return 1;
  return a.categoryName > b.categoryName ? 1 : -1;
}

function generateMealLegendContent(data: DataPoint<ChartDataPoint>[]) {
  const foods: FoodCatalogueEntry[] | undefined = [];
  // Go over all data.y values.
  // For every, go through FoodCatalogue and take food catalogue entry if FC = data.y.foodid
  for (const point of data) {
    const food = foodCatalogueRawData.values.find(
      (catalogueEntry) => point.y.pointId === catalogueEntry.foodId
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
        symbol: MarkerStylingPicker.getSymbol(category),
        subcategory: foods.map((food) => {
          return {
            id: food.foodId,
            text: food.name,
            isSelected: false,
            symbol: MarkerStylingPicker.getSymbol(food.foodId),
          };
        }),
      });
    }
  }
  return legendContent.sort(legendOrdering);
}

function generateSymptomsLegendContent(data: DataPoint<ChartDataPoint>[]) {
  const symptoms: SymptomCatalogueEntry[] | undefined = [];
  // Go over all data.y values.
  // For every, go through SymptomsCatalogue and take symptoms catalogue entry if FC = data.y.symptomsid
  for (const point of data) {
    const symptom = symptomsCatalogueRawData.values.find(
      (catalogueEntry) => point.y.pointId === catalogueEntry.symptomId
    );
    if (symptom && !symptoms.some((f) => f.symptomId === symptom.symptomId)) {
      symptoms.push(symptom);
    }
  }
  // Group obtained array by x.category; there are none for symptoms
  const grouped: Accumulator<SymptomCatalogueEntry> = { Symptoms: symptoms };
  // Map to legendContent interface
  const legendContent: ExpandableListElementItem[] = [
    {
      isExpanded: false,
      isSelected: false,
      categoryName: 'Symptoms',
      symbol: MarkerStylingPicker.getSymbol('Symptoms'),
      subcategory: grouped['Symptoms'].map((symptoms) => {
        return {
          id: symptoms.symptomId,
          text: symptoms.name,
          isSelected: false,
          symbol: MarkerStylingPicker.getSymbol(symptoms.symptomId),
        };
      }),
    },
  ];
  return legendContent.sort(legendOrdering);
}
