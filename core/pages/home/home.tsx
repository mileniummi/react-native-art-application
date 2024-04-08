import {createStackNavigator} from '@react-navigation/stack';

import {Shows} from './shows';
import {IShowParams, Show} from './show';

export enum EHomeStackScreens {
    show = 'Show',
    shows = 'Shows'
}

export interface IRootStackParamList extends Record<string, any> {
    [EHomeStackScreens.show]: IShowParams;
    [EHomeStackScreens.shows]: undefined;
}

const Stack = createStackNavigator<IRootStackParamList>();

export const HomePage = () => (
    <Stack.Navigator initialRouteName="Shows">
        <Stack.Screen
            name={EHomeStackScreens.shows}
            component={Shows}
        />
        <Stack.Screen
            name={EHomeStackScreens.show}
            component={Show}
        />
    </Stack.Navigator>
);
