import _ from 'lodash';

import {IEmbeddedApiResponse, IImageLink} from './common.model';

export interface IGetImagesRequest {
    show_id: string;
    cursor?: string;
}

export interface IImage {
    id: string;
    _links: {
        thumbnail: IImageLink;
    };
}

export interface IImagesResponse {
    images: IImage[];
}

// concatenates images and checks their identity and validity
export const createEmbeddedImages = (data: IEmbeddedApiResponse<IImagesResponse>, images?: IImage[]) => ({
    ...data,
    _embedded: {
        ...data._embedded,
        images: _.uniqBy([...(images || []), ...data._embedded.images], 'id')
            .filter(image => !!image._links.thumbnail),
    },
});
