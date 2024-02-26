/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './src/store/store';
import 'react-native-console-time-polyfill';
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const isProduction = process.env.NODE_ENV === 'production';

// Встановлюємо флаг __DEV__ в false для режиму виробництва
if (isProduction) {
  console.log = () => {};
}

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
