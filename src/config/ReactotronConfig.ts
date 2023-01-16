import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
interface PluginConfig {
  except?: string[];
}
declare global {
  interface Console {
    tron: any;
  }
}
if (__DEV__) {
  const tron = Reactotron
    .setAsyncStorageHandler!(AsyncStorage)
    .configure({ host: '192.168.1.104' })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga({ except: [''] }))
    .connect();

  tron.clear!();

  console.tron = tron;
}
