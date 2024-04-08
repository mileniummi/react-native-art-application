import React from 'react';
import {
    useFonts,
    // eslint-disable-next-line camelcase,
    Archivo_100Thin,
    // eslint-disable-next-line camelcase
    Archivo_200ExtraLight,
    // eslint-disable-next-line camelcase
    Archivo_300Light,
    // eslint-disable-next-line camelcase
    Archivo_400Regular,
    // eslint-disable-next-line camelcase
    Archivo_500Medium,
    // eslint-disable-next-line camelcase
    Archivo_600SemiBold,
    // eslint-disable-next-line camelcase
    Archivo_700Bold,
    // eslint-disable-next-line camelcase
    Archivo_800ExtraBold,
    // eslint-disable-next-line camelcase
    Archivo_900Black,
} from '@expo-google-fonts/archivo';
import {Text} from 'react-native';

export interface IFontsLoaderProps {
    children: React.ReactNode;
}

export const FontsProvider = ({children}: IFontsLoaderProps) => {
    const [isLoaded] = useFonts({
        // eslint-disable-next-line camelcase
        Archivo_100Thin,
        // eslint-disable-next-line camelcase
        Archivo_200ExtraLight,
        // eslint-disable-next-line camelcase
        Archivo_300Light,
        // eslint-disable-next-line camelcase
        Archivo_400Regular,
        // eslint-disable-next-line camelcase
        Archivo_500Medium,
        // eslint-disable-next-line camelcase
        Archivo_600SemiBold,
        // eslint-disable-next-line camelcase
        Archivo_700Bold,
        // eslint-disable-next-line camelcase
        Archivo_800ExtraBold,
        // eslint-disable-next-line camelcase
        Archivo_900Black,
    });

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    }

    return children;
};
