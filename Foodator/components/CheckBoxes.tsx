import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { RegularText } from './StyledText';

type CheckBoxProps = {
  checked?: boolean;
  size?: number;
  color?: ColorValue;
  onChange?: (newValue: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  label?: string;
};

export function RoundCheckBox(props: CheckBoxProps): React.ReactElement {
  const [checked, setChecked] = React.useState(props.checked ?? false);
  const handlePress = () => {
    setChecked(!checked);
    props.onChange && props.onChange(checked);
  };
  return (
    <TouchableOpacity
      style={[props.textStyle, { backgroundColor: 'transparent' }]}
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

export function SmallCheckBox(props: CheckBoxProps): React.ReactElement {
  const [checked, setChecked] = React.useState(props.checked ?? false);
  const handlePress = () => {
    setChecked(!checked);
    props.onChange && props.onChange(!checked);
  };
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <RegularText style={[styles.label, props.textStyle]}>
        {props.label}
      </RegularText>
      {/* // TODO: On touch change state */}
      <MaterialCommunityIcons
        name={checked ? 'circle-slice-8' : 'circle-outline'}
        size={props.size || 28}
        // TODO: Move color to constants
        color={props.color || '#2E6278'}
        style={[styles.icon, props.iconStyle]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
  },
  label: {},
  icon: {},
});
