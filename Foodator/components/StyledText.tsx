import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props: Text['props']): React.ReactElement {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}
