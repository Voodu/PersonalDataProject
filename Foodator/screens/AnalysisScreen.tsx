import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnalysisScreenProps } from '../types';

export function AnalysisScreen({ navigation }: AnalysisScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis</Text>
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
