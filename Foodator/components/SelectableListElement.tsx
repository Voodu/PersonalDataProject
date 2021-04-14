import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { CheckBox } from './CheckBox';
import { RegularText, SecondaryText } from './StyledText';

type ListElementProps = {
  text: string;
  subText: string;
  selected: boolean;
};

export function SelectableListElement(
  props: ListElementProps
): React.ReactElement {
  // const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <CheckBox value={props.selected} />
      <View style={styles.textContainer}>
        <RegularText>{props.text}</RegularText>
        <SecondaryText>{props.subText}</SecondaryText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    // TODO: Move color to constant
    borderTopColor: '#9FB6BF',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 7,
  },
});
