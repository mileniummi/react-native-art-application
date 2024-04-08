import _ from 'lodash';

import {IEmbeddedApiResponse, IImageLink} from './common.model';

export interface IShow {
    id: string;
    name: string;
    description: string;
    _links: {
        thumbnail: IImageLink;
    };
}

export enum EShowStatus {
    upcoming = 'upcoming',
    running = 'running',
    closed = 'closed',
    current = 'current'
}

export const ShowStatusMap = Object.values(EShowStatus).reduce((previousValue, currentValue) => ({
    ...previousValue,
    [currentValue]: undefined,
}), {} as Record<EShowStatus, any>);

export interface IGetShowsResponse {
    shows: IShow[];
}

// concatenates shows and checks their identity and validity
export const createEmbeddedShows = (data: IEmbeddedApiResponse<IGetShowsResponse>, shows?: IShow[]) => ({
    ...data,
    _embedded: {
        ...data._embedded,
        shows: _.uniqBy([...(shows || []), ...data._embedded.shows], 'id')
            .filter(show => !!show._links.thumbnail),
    },
});

export interface IGetShowsRequest {
    status: EShowStatus;
    cursor?: string;
}
