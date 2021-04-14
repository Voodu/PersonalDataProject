import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HomeScreenProps } from '../types';

export function HomeScreen({
  navigation,
}: HomeScreenProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello there!</Text>
      <Text style={styles.title}>How do you feel?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddFood')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Food_Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddDiscomfort')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Discomfort_Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Analysis')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Analysis</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Calendar')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Calendar</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
