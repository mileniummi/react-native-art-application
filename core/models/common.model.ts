export interface IImageLink {
    href: string;
}

export interface IEmbeddedApiResponse<Response extends Record<string, any>> {
    _embedded: Response;
    _links: {
        next?: {
            href: string;
        };
        self: {
            href: string;
        };
    };
    total_count: number | null;
}
