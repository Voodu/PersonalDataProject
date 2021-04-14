import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';

type CheckBoxProps = {
  value: boolean;
};

export function CheckBox(props: CheckBoxProps): React.ReactElement {
  return (
    <TouchableHighlight activeOpacity={0.5}>
      {/* // TODO: On touch change state */}
      <MaterialCommunityIcons
        name={props.value ? 'circle-slice-8' : 'circle-outline'}
        size={36}
        // TODO: Move color to constants
        color="#2E6278"
      />
    </TouchableHighlight>
  );
}
