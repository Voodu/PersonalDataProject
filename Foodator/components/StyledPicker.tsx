import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RegularText } from './StyledText';

// Has to be defined here, as datetimepicker does not export this type
type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';

type TimePickerProps = View['props'] & {
  onChange?: (event: Event, selectedDate?: Date | undefined) => void;
};

export function TimePicker(props: TimePickerProps): React.ReactElement {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState<IOSMode | AndroidMode>('date');
  const [show, setShow] = React.useState(false);

  const handleChange = (event: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    props.onChange && props.onChange(event, selectedDate);
  };

  const showMode = (currentMode: IOSMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formattedDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formattedTime = (time: Date) => {
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  const pickerView = (
    <View
      style={{
        width: mode === 'time' ? 60 : 120,
      }}
    >
      <DateTimePicker value={date} mode={mode} onChange={handleChange} />
    </View>
  );

  return (
    <View style={[props.style, styles.mainContainer]}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={showDatepicker}>
          {show && mode === 'date' ? (
            pickerView
          ) : (
            <RegularText style={[styles.clickableText, styles.text]}>
              {formattedDate(date)}
            </RegularText>
          )}
        </TouchableOpacity>
        <RegularText style={styles.text}> at </RegularText>
        <TouchableOpacity onPress={showTimepicker}>
          {show && mode === 'time' ? (
            pickerView
          ) : (
            <RegularText style={[styles.clickableText, styles.text]}>
              {formattedTime(date)}
            </RegularText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 74,
    borderRadius: 17,
    backgroundColor: Colors.light.white,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
  },
  clickableText: {
    color: Colors.light.blueMain,
  },
});
