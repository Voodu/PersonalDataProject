import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderText } from '../components/StyledText';
import { InputWithTouchableOpacity } from '../components/StyledTextInput';
import { AddFoodScreenProps } from '../types';
import Images from '../assets/images/index';

export function AddFoodScreen({}: AddFoodScreenProps): React.ReactElement {
  return (
    <View style={styles.viewContainer}>
      <HeaderText>What have you eaten?</HeaderText>
      <View style={styles.listContainer}>
        <InputWithTouchableOpacity
          placeholder="Find food..."
          image={Images.favicon}
        ></InputWithTouchableOpacity>
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
    padding: '15%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#ff00ff',
  },
});
