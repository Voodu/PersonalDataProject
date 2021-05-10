import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { ScatterSymbolType, Text } from 'victory-core';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

type SymbolProps = Text['props'] & {
  name?: ScatterSymbolType;
  size?: number;
  color?: ColorValue;
};

export function Symbol(props: SymbolProps): React.ReactElement {
  let graphics = null;
  switch (props.name) {
    case 'circle':
      graphics = (
        <FontAwesome
          name="circle"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'cross':
      graphics = (
        <FontAwesome5
          name="cross"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'diamond':
      graphics = (
        <Ionicons
          name="square-sharp"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
          style={{
            // textAlign: 'center',
            transform: [{ rotate: '45deg' }],
          }}
        />
      );
      break;
    case 'minus':
      graphics = (
        <FontAwesome
          name="minus"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'plus':
      graphics = (
        <FontAwesome
          name="plus"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'square':
      graphics = (
        <Ionicons
          name="square-sharp"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'star':
      graphics = (
        <FontAwesome
          name="star"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'triangleDown':
      graphics = (
        <Entypo
          name="triangle-down"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    case 'triangleUp':
      graphics = (
        <Entypo
          name="triangle-up"
          size={props.size ?? 24}
          color={props.color ?? 'black'}
        //   style={{
        //     textAlign: 'center',
        //   }}
        />
      );
      break;
    default:
      break;
  }
  return <View style={[styles.container, props.style]}>{graphics}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
});
