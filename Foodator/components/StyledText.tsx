import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

export function MonoText(props: Text['props']): React.ReactElement {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export function HeaderText(props: Text['props']): React.ReactElement {
  return <Text {...props} style={[props.style, styles.header]} />;
}

const styles = StyleSheet.create({
  header: { fontSize: 36, fontFamily: 'lato', textAlign: 'center' },
});
