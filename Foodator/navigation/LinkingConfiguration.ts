import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          AddFood: {
            screens: {
              AddFoodScreen: 'food',
            },
          },
          AddDiscomfort: {
            screens: {
              AddDiscomfortScreen: 'discomfort',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Analysis: {
            screens: {
              AnalysisScreen: 'analysis',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
