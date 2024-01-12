import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/routes/Navigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
