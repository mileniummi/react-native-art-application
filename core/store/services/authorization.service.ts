import axios from 'axios';

export interface IAuthorizationResult {
    token: string;
    expires_at: string;
    type: string;
}

export const getArtsyToken = async () => {
    const response = await axios.post<IAuthorizationResult>(
        `${process.env.EXPO_PUBLIC_API_URL}/api/tokens/xapp_token`, {
            client_id: process.env.EXPO_PUBLIC_API_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_API_CLIENT_SECRET,
        },
    );

    return response.data.token;
};
