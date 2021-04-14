import * as React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { HeaderText } from '../components/StyledText';
import { InputWithTouchableOpacity } from '../components/StyledTextInput';
import { AddFoodScreenProps } from '../types';
import { SelectableListElement } from '../components/ListElements';
import Colors from '../constants/Colors';

export function AddFoodScreen({}: AddFoodScreenProps): React.ReactElement {
  // TODO: Remeber to have some sort of ID
  const products = [
    { product: 'Avocado', quantity: 'Half', selected: true },
    { product: 'Wheat bread', quantity: '1 slice', selected: true },
    { product: 'Philadelphia', quantity: '1 tablespoon', selected: true },
    { product: 'Feta cheese', quantity: '50 g', selected: false },
    { product: 'Tomato', quantity: '5 slices', selected: true },
    { product: 'Salt', quantity: 'pinch', selected: true },
    { product: 'Pepper', quantity: 'pinch', selected: false },
    { product: 'Potatoes', quantity: '2 whole', selected: false },
  ];
  const listItems = products.map((product) => (
    <SelectableListElement
      key={product.product}
      text={product.product}
      subText={product.quantity}
      selected={product.selected}
    />
  ));
  return (
    <View style={styles.viewContainer}>
      <HeaderText style={styles.header}>What have you eaten?</HeaderText>
      <View style={styles.listContainer}>
        <InputWithTouchableOpacity
          placeholder="Find food..."
          icon={'arrow-down'}
          style={styles.input}
        ></InputWithTouchableOpacity>
        <ScrollView>{listItems}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '10%',
    paddingTop: 10,
  },
  header: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '75%',
    backgroundColor: Colors.light.white,
    borderRadius: 17,
    padding: 16,
  },
});
