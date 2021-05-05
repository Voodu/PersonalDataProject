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
  ExpandableListElement,
  ExpandableListElementItem,
} from '../components';
import { ProfileScreenProps } from '../types';

export function ProfileScreen({}: ProfileScreenProps): React.ReactElement {
  const [listDataSource, setListDataSource] = React.useState(CONTENT);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];

    array.forEach((value, placeindex) =>
      placeindex === index
        ? (value.isExpanded = !value.isExpanded)
        : (value.isExpanded = false)
    );

    setListDataSource(array);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {listDataSource.map((item, key) => (
          <ExpandableListElement
            key={item.categoryName}
            onPress={() => {
              updateLayout(key);
            }}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const CONTENT: ExpandableListElementItem[] = [
  {
    isExpanded: false,
    categoryName: 'Symptoms',
    subcategory: [
      { id: 0, text: 'Stomachache' },
      { id: 1, text: 'Nausea' },
      { id: 2, text: 'Cramps' },
      { id: 3, text: 'Bloating' },
    ],
  },
  {
    isExpanded: false,
    categoryName: 'Chocolate',
    subcategory: [
      { id: 4, text: 'Milk chocolate' },
      { id: 5, text: 'Dark chocolate' },
    ],
  },
];
