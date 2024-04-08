import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
    ActivityIndicator,
    FlatList, Image, StyleSheet, View,
} from 'react-native';

import {EHomeStackScreens, IRootStackParamList} from '../home';
import {useGetImagesQuery} from '../../../store/services/images.service';
import {extractCursorValueFromLink} from '../../../utils/api.utils';
import {IEmbeddedApiResponse} from '../../../models/common.model';
import {createEmbeddedImages, IImagesResponse} from '../../../models/images.model';

export interface IShowParams {
    showId: string;
}

export interface IShowProps extends StackScreenProps<IRootStackParamList, EHomeStackScreens.show> {
}

export const Show = ({route: {params}}: IShowProps) => {
    const [cursor, setCursor] = useState<string>();
    const [images, setImages] = useState<IEmbeddedApiResponse<IImagesResponse>>();
    const {data, isFetching, isLoading} = useGetImagesQuery({show_id: params.showId, cursor});

    const nextCursor = data?._links.next?.href && extractCursorValueFromLink(data?._links.next.href);

    useEffect(() => {
        if (!data) return;

        if (!images) {
            setImages(data);
        } else {
            setImages(createEmbeddedImages(data, images?._embedded.images));
        }
    }, [data]);

    return (
        isLoading ? <ActivityIndicator />
            : (
                <FlatList
                    data={images?._embedded?.images}
                    contentContainerStyle={styles.images}
                    keyExtractor={item => item.id}
                    onEndReached={nextCursor ? () => setCursor(nextCursor) : undefined}
                    ListFooterComponent={isFetching ? <ActivityIndicator /> : undefined}
                    renderItem={({item}) => (
                        <View>
                            <Image
                                style={styles.image}
                                source={{uri: item._links.thumbnail.href}}
                            />
                        </View>
                    )}
                />
            )
    );
};

const styles = StyleSheet.create({
    images: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 20,
    },

    image: {
        width: '100%',
        height: 164,
        borderRadius: 27,
    },
});
