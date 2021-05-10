import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import {
  AddDiscomfortScreen,
  AddFoodScreen,
  AnalysisScreen,
  CalendarScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import { MainStackParamList } from '../types';

const MainStack = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator(): React.ReactElement {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{ headerTitle: 'Add food' }}
      />
      <MainStack.Screen
        name="AddDiscomfort"
        component={AddDiscomfortScreen}
        options={{ headerTitle: 'Add discomfort' }}
      />
      <MainStack.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ headerTitle: 'Graph B' }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Graph A' }}
      />
      <MainStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerTitle: 'Calendar' }}
      />
    </MainStack.Navigator>
  );
}
