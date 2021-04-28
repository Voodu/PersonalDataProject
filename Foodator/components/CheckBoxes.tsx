import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';

type CheckBoxProps = {
  checked?: boolean;
  size?: number;
  color?: ColorValue;
  onChange?: (newValue: boolean) => void;
};

export function CheckBox(props: CheckBoxProps): React.ReactElement {
  const [checked, setChecked] = React.useState(props.checked ?? false);
  const handlePress = () => {
    setChecked(!checked);
    props.onChange && props.onChange(checked);
  };
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'transparent' }}
      onPress={handlePress}
      activeOpacity={1}
    >
      {/* // TODO: On touch change state */}
      <MaterialCommunityIcons
        name={checked ? 'circle-slice-8' : 'circle-outline'}
        size={props.size || 36}
        // TODO: Move color to constants
        color={props.color || '#2E6278'}
      />
    </TouchableOpacity>
  );
}
