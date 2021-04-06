import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
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

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Home">
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
        options={{ headerTitle: 'Analysis' }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <MainStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerTitle: 'Calendar' }}
      />
    </MainStack.Navigator>
  );
}
