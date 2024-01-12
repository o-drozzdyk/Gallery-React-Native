import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PhotoScreen} from '../screens/PhotoScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {colors, spacing} from '../utils/styles';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Unsplash Gallery',
          headerTitleStyle: {
            fontSize: spacing.large,
            color: 'white',
          },

          headerStyle: {
            height: 60,
            backgroundColor: colors.header,
          },
        }}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoScreen}
        options={{
          headerTitleStyle: {
            fontSize: spacing.large,
            color: 'white',
          },

          headerStyle: {
            height: 60,
            backgroundColor: colors.header,
          },

          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
