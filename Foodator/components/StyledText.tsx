import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export function MonoText(props: Text['props']): React.ReactElement {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export function HeaderText(props: Text['props']): React.ReactElement {
  return <Text {...props} style={[props.style, styles.header]} />;
}

export function RegularText(props: Text['props']): React.ReactElement {
  return <Text {...props} style={[props.style, styles.regular]} />;
}

export function SecondaryText(props: Text['props']): React.ReactElement {
  return <Text {...props} style={[props.style, styles.secondary]} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontFamily: 'lato',
    textAlign: 'center',
    color: Colors.light.darkBlue,
  },
  regular: {
    fontSize: 24,
    fontFamily: 'lato',
    // TODO: Move color to constants
    color: 'rgba(46, 98, 120, 1)',
  },
  secondary: {
    fontSize: 13,
    fontFamily: 'lato',
    // TODO: Move color to constants
    color: 'rgba(159, 182, 191, 1)',
  },
});
