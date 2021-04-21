import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

export function BigButton(props: Text['props'] | TouchableOpacity['props']): React.ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 74,
    backgroundColor: Colors.light.redBad,
    borderRadius: 22,
  },
  text: {
    fontSize: 24,
    color: Colors.light.white,
  },
});
