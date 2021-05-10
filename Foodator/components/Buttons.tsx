import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

export function BigButton(
  props: Text['props'] | TouchableOpacity['props']
): React.ReactElement {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[stylesBig.button, props.style]}
    >
      <Text style={stylesBig.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const stylesBig = StyleSheet.create({
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

export function SmallButton(
  props: Text['props'] | TouchableOpacity['props']
): React.ReactElement {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[stylesSmall.button, props.style]}
    >
      <Text style={stylesSmall.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const stylesSmall = StyleSheet.create({
  button: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.light.redBad,
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    color: Colors.light.white,
  },
});
