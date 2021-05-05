import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import { RoundCheckBox, SmallCheckBox } from './CheckBoxes';
import { RegularText, SecondaryText } from './StyledText';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type SelectableListElementProps = {
  text: string;
  subText: string;
  selected: boolean;
};

export function SelectableListElement(
  props: SelectableListElementProps
): React.ReactElement {
  return (
    <View style={selectableStyles.mainContainer}>
      <RoundCheckBox onChange={() => console.log('CheckBox pressed')} />
      <View style={selectableStyles.textContainer}>
        <RegularText>{props.text}</RegularText>
        <SecondaryText>{props.subText}</SecondaryText>
      </View>
    </View>
  );
}

const selectableStyles = StyleSheet.create({
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

type ExpandableListElementProps<T> = {
  item: T;
  onPress?: (event: GestureResponderEvent) => void;
};

interface ExpandableListElementItemSubcategory {
  id: number;
  text: string;
  data?: unknown;
}
export interface ExpandableListElementItem {
  isExpanded: boolean;
  categoryName: string;
  subcategory: ExpandableListElementItemSubcategory[];
}

export function ExpandableListElement<T extends ExpandableListElementItem>(
  props: ExpandableListElementProps<T>
): React.ReactElement {
  const [layoutHeight, setLayoutHeight] = React.useState<number | string>(0);

  React.useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight('auto');
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        style={expandableStyles.header}
      >
        <AntDesign
          name={props.item.isExpanded ? 'down' : 'right'}
          size={20}
          style={expandableStyles.arrow}
        />
        <RegularText style={expandableStyles.headerText}>
          {props.item.categoryName}
        </RegularText>
        <SmallCheckBox
          containerStyle={expandableStyles.categoryCheckbox}
          onChange={() => console.log('Category pressed')}
        />
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}
      >
        {/*Content under the header of the Expandable List Item*/}
        {props.item.subcategory.map((item, key) => (
          <View key={key} style={expandableStyles.content}>
            <SmallCheckBox
              textStyle={expandableStyles.text}
              onChange={() => console.log('Item pressed')}
              label={item.text}
              size={28}
            />
            {key < props.item.subcategory.length - 1 && (
              <View style={expandableStyles.separator} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const expandableStyles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.whiteArea,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  arrow: {
    color: 'rgba(46, 98, 120, 1)',
    marginRight: 5,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
  },
  categoryCheckbox: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
  },
  text: {
    fontSize: 20,
    // TODO: Move color to constants
    alignSelf: 'center',
    color: 'rgba(46, 98, 120, 1)',
    paddingLeft: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
