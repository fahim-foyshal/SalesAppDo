import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import store from './store/configure';
import App from './App';
import { PaperProvider, Text } from 'react-native-paper';
import {name as appName} from './app.json';
const ReduxApp = () => (
    <Provider store={store}>

         <App />

    </Provider>
  );

AppRegistry.registerComponent(appName, () => ReduxApp);