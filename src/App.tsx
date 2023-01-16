import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  ActivityIndicator,
  Colors,
  DefaultTheme,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { navigationRef } from './services/navigation';
import Routes from './routes';
import { store, persistor } from './store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigo500,
    accent: '#FFF',
  },
};
const App: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <StatusBar hidden />
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider
          settings={{
            icon: (props) => <FontAwesome {...props} />,
          }}
          theme={theme}
        >
          <Routes />
          <Toast
            style={{ zIndex: 100000000000 }}
            ref={(ref) => Toast.setRef(ref)}
          />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  </NavigationContainer>
);

export default App;
