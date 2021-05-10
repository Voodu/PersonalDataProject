import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  AddFood: undefined;
  AddDiscomfort: undefined;
  Profile: undefined;
  Analysis: undefined;
  Calendar: undefined;
};

export type HomeScreenProps = StackScreenProps<MainStackParamList, 'Home'>;
export type AddFoodScreenProps = StackScreenProps<
  MainStackParamList,
  'AddFood'
>;
export type AddDiscomfortScreenProps = StackScreenProps<
  MainStackParamList,
  'AddDiscomfort'
>;
export type ProfileScreenProps = StackScreenProps<
  MainStackParamList,
  'Profile'
>;
export type AnalysisScreenProps = StackScreenProps<
  MainStackParamList,
  'Analysis'
>;
export type CalendarScreenProps = StackScreenProps<
  MainStackParamList,
  'Calendar'
>;
