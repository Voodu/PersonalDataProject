import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type InputWithTouchableOpacityProps = TextInput['props'] & {
  image: ImageSourcePropType;
};

export function InputWithTouchableOpacity(
  props: InputWithTouchableOpacityProps
): React.ReactElement {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        {...props}
        style={styles.input}
        // TODO: Move color to constants
        placeholderTextColor="#9FB6BF"
      />
      <TouchableOpacity activeOpacity={0.5} style={styles.button}>
        <Image source={props.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000000',
    maxWidth: '100%',
  },
  input: {
    fontFamily: 'lato',
    fontSize: 24,
    width: '80%',
  },
  button: {
    width: '20%',
  },
});
