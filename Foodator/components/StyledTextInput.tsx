import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  ColorValue,
  GestureResponderEvent,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { IoniconGlyphs } from '../constants/IoniconGlyphs';

type InputWithTouchableOpacityProps = TextInput['props'] & {
  image?: ImageSourcePropType;
  icon?: IoniconGlyphs;
  iconColor?: ColorValue;
  onPress?: (event: GestureResponderEvent) => void;
};

export function InputWithTouchableOpacity(
  props: InputWithTouchableOpacityProps
): React.ReactElement {
  let graphics = null;
  if (props.image) {
    graphics = <Image source={props.image} />;
  } else if (props.icon) {
    // TODO: Move color to constants
    graphics = <Ionicons name={props.icon} size={32} color={'#9FB6BF'} />;
  }
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        {...props}
        style={styles.input}
        // TODO: Move color to constants
        placeholderTextColor="#9FB6BF"
      />
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        {graphics}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  input: {
    fontFamily: 'lato',
    fontSize: 24,
  },
});
