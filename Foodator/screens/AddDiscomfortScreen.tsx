import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddDiscomfortScreenProps } from '../types';

export function AddDiscomfortScreen({ navigation }: AddDiscomfortScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add discomfort</Text>
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
