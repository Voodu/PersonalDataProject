import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddFoodScreenProps } from '../types';

export function AddFoodScreen({ navigation }: AddFoodScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add food</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
