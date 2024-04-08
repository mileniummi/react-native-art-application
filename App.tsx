import 'react-native-gesture-handler';
// eslint-disable-next-line import/no-duplicates
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import {FontsProvider} from './core/fonts';
import {Layout} from './core/components/navigation';
import {store} from './core/store';

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store}>
                <FontsProvider>
                    <Layout />
                </FontsProvider>
            </Provider>
        </GestureHandlerRootView>
    );
}
