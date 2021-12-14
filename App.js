import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { useFonts } from 'expo-font';
import { I18nManager } from "react-native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import ApplicationNavigator from './src/ApplicationNavigator';

I18nManager.forceRTL(true);
const store = createStore(rootReducer);

const App = () => {

    const [loaded] = useFonts({
        VarelaRound: require('./assets/fonts/VarelaRound-Regular.ttf')
    });

    const reload = async () => {
        await Updates.reloadAsync()
    }

    useEffect(() => {
        if (!I18nManager.isRTL)
            reload();
    }, []);

    if (!loaded)
        return null;

    return (
        <Provider store={store}>
            <ApplicationNavigator />
        </Provider>
    )
}

export default App;
