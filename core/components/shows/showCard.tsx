import React from 'react';
import {
    StyleSheet, View, Image, Text,
} from 'react-native';

import {IShow} from '../../models/show.model';

export interface IShowCardProps {
    show: IShow;
}

export const ShowCard = ({show}: IShowCardProps) => (
    show?._links?.thumbnail?.href
        ? (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: show._links.thumbnail.href}}
                />
                <View style={styles.content}>
                    <Text style={styles.header}>
                        {show.name}
                    </Text>
                    <Text style={styles.description}>
                        {show.description}
                    </Text>
                </View>
            </View>
        ) : null
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#fff',
        shadowColor: '#29292926',
        shadowOffset: {width: 5, height: 5},
        elevation: 5,
        borderRadius: 27,

    },

    content: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },

    image: {
        width: '100%',
        height: 164,
        borderRadius: 27,
    },
    header: {
        marginTop: 8,
        lineHeight: 14,
        fontSize: 13,
        fontFamily: 'Archivo_500Medium',
    },
    description: {
        marginTop: 8,
        lineHeight: 13,
        fontSize: 12,
        color: '#8A8E85',
        fontFamily: 'Archivo_400Regular',
    },
});
