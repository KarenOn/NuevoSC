/**
 * @format
 */

import { AppRegistry } from 'react-native';

// Views
import RootView from './src/views/RootView';

// Assets
import { name as appName } from './app.json';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => RootView);
