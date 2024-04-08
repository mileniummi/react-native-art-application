import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList, Pressable, StyleSheet, Text, View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {useGetShowsQuery} from '../../../store/services/shows.service';
import {
    EShowStatus, IGetShowsResponse, ShowStatusMap, createEmbeddedShows,
} from '../../../models/show.model';
import {ShowCard} from '../../../components/shows';
import {ShowStatusDropdown} from './filters';
import {extractCursorValueFromLink} from '../../../utils/api.utils';
import {IEmbeddedApiResponse} from '../../../models/common.model';

export interface IShowsProps extends StackScreenProps<any> {
}

export const Shows = ({navigation}: IShowsProps) => {
    const [cursor, setCursor] = useState<Record<EShowStatus, string>>(ShowStatusMap);
    const [status, setStatus] = useState(EShowStatus.running);
    const [shows, setShows] = useState<Record<EShowStatus, IEmbeddedApiResponse<IGetShowsResponse> | undefined>>(
        ShowStatusMap,
    );

    const {data, isLoading, isFetching} = useGetShowsQuery({status, cursor: cursor[status]});
    const nextCursor = data?._links.next?.href && extractCursorValueFromLink(data?._links.next.href);

    useEffect(() => {
        if (!data) return;

        if (!shows[status]) {
            setShows(v => ({...v, [status]: data}));
        } else {
            setShows(v => ({ // concat new shows with old
                ...v,
                [status]: createEmbeddedShows(data, shows[status]?._embedded.shows),
            }));
        }
        // load more if not enough to display
        if (createEmbeddedShows(data, shows[status]?._embedded.shows)._embedded.shows.length < 5 && nextCursor) {
            setCursor(v => ({...v, [status]: nextCursor}));
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Explore Global Art</Text>
            <View style={styles.filters}>
                <ShowStatusDropdown
                    value={status}
                    onChange={setStatus}
                />
            </View>
            {isLoading ? <ActivityIndicator />
                : (
                    <FlatList
                        data={shows[status]?._embedded?.shows}
                        style={styles.shows}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.content}
                        onEndReached={nextCursor ? () => setCursor(v => ({...v, [status]: nextCursor})) : undefined}
                        ListFooterComponent={isFetching ? <ActivityIndicator /> : undefined}
                        renderItem={({item}) => (
                            <Pressable onPress={() => navigation.navigate('Show', {showId: item.id})}>
                                <ShowCard show={item} />
                            </Pressable>
                        )}
                    />
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        padding: 18,
    },
    shows: {
        marginBottom: 100,
    },
    content: {
        gap: 14,
        marginTop: 13,
        marginBottom: 40,
    },
    text: {
        lineHeight: 30,
        fontSize: 28,
        marginBottom: 18,
        fontFamily: 'Archivo_500Medium',
    },
    filters: {
        paddingBottom: 10,
    },
});
