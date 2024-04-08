import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {EAppRoutes} from '../../constants/routing';
import {HomePage} from '../../pages/home';
import {useAppDispatch, useAppSelector} from '../../store/hooks/store.hook';
import {getArtsyToken} from '../../store/services/authorization.service';
import {authActions, selectAuthToken} from '../../store/reducers/auth/auth.reducer';
import {BrowsePage} from '../../pages/browse/browse';
import {MapPage} from '../../pages/map/map';
import {ScanPage} from '../../pages/scan/scan';
import {ChatPage} from '../../pages/chat/chat';

import Search from '../../../assets/navbar/search.svg';
import Location from '../../../assets/navbar/location.svg';
import Scan from '../../../assets/navbar/scan.svg';
import Messenger from '../../../assets/navbar/messenger.svg';
import Home from '../../../assets/navbar/home.svg';

const Tab = createBottomTabNavigator();

export const Layout = () => {
    const dispatch = useAppDispatch();
    const authToken = useAppSelector(selectAuthToken);

    useEffect(() => {
        (async () => {
            try {
                const token = await getArtsyToken();
                dispatch(authActions.setToken(token));
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (authToken
        ? (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={EAppRoutes.Homepage}
                    screenOptions={({route}) => ({
                        tabBarIcon: ({color}) => {
                            if (route.name === EAppRoutes.Browse) {
                                return <Search color={color} />;
                            }
                            if (route.name === EAppRoutes.Map) {
                                return <Location color={color} />;
                            }
                            if (route.name === EAppRoutes.Scan) {
                                return <Scan color={color} />;
                            }
                            if (route.name === EAppRoutes.Chat) {
                                return <Messenger color={color} />;
                            }
                            return <Home color={color} />;
                        },
                        headerShown: false,
                        tabBarActiveTintColor: '#2234CF',
                        tabBarInactiveTintColor: '#292D32',
                        tabBarActiveBackgroundColor: '#F3F3FF',
                        tabBarStyle: styles.tabBarStyle,
                        tabBarItemStyle: styles.tabBarItemStyle,
                    })}
                >
                    <Tab.Screen
                        name={EAppRoutes.Homepage}
                        component={HomePage}
                    />
                    <Tab.Screen
                        name={EAppRoutes.Browse}
                        component={BrowsePage}
                    />
                    <Tab.Screen
                        name={EAppRoutes.Map}
                        component={MapPage}
                    />
                    <Tab.Screen
                        name={EAppRoutes.Scan}
                        component={ScanPage}
                    />
                    <Tab.Screen
                        name={EAppRoutes.Chat}
                        component={ChatPage}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.activityIndicator}
            />
        )
    );
};

const styles = StyleSheet.create({
    tabBarItemStyle: {
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    tabBarStyle: {
        backgroundColor: 'white',
        borderTopColor: 'white',
        borderTopWidth: 1,
        minHeight: 60,
        paddingHorizontal: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    activityIndicator: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
