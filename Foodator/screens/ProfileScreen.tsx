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
            onExpand={() => {
              updateLayout(key);
            }}
            onSelected={() => setListDataSource([...listDataSource])}
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
    isSelected: false,
    categoryName: 'Symptoms',
    subcategory: [
      { id: 0, text: 'Stomachache', isSelected: false },
      { id: 1, text: 'Nausea', isSelected: false },
      { id: 2, text: 'Cramps', isSelected: false },
      { id: 3, text: 'Bloating', isSelected: false },
    ],
  },
  {
    isExpanded: false,
    isSelected: false,
    categoryName: 'Chocolate',
    subcategory: [
      { id: 4, text: 'Milk chocolate', isSelected: false },
      { id: 5, text: 'Dark chocolate', isSelected: false },
    ],
  },
];
