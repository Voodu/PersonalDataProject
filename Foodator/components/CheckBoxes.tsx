import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ScatterSymbolType } from 'victory-core';
import { RegularText } from './StyledText';
import { Symbol } from './Symbol';

type CheckBoxProps = {
  checked?: boolean;
  size?: number;
  color?: ColorValue;
  onChange?: (newValue: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  label?: string;
  partial?: boolean;
  symbol?: ScatterSymbolType;
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
    setChecked(!props.checked ?? !checked);
    props.onChange && props.onChange(!props.checked ?? !checked);
  };

  let graphics = null;
  if (props.symbol && (props.checked ?? checked)) {
    graphics = (
      <Symbol
        name={props.symbol}
        size={props.size || 28}
        // TODO: Move color to constants
        color={props.color || '#2E6278'}
        style={[styles.icon, props.iconStyle]}
      />
    );
  }

  const icon = props.partial
    ? 'circle-slice-4'
    : props.checked ?? checked
    ? 'circle-slice-8'
    : 'circle-outline';
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <RegularText style={[styles.label, props.textStyle]}>
        {props.label}
      </RegularText>
      {graphics ?? (
        <MaterialCommunityIcons
          name={icon}
          size={props.size || 28}
          // TODO: Move color to constants
          color={props.color || '#2E6278'}
          style={[styles.icon, props.iconStyle]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
  },
  label: {},
  icon: {
    // textAlign: 'center',
    height: 28,
    width: 28,
  },
});
