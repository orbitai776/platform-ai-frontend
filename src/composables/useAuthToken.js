import { auth } from '~/src/auth/firebase'

let accessTokenCache = null;

export function useAuthToken() {

    const getAccessToken = async (forceRefresh = false) => {
        if (process.server) return null;

        const user = auth.currentUser;
        if (!user) return null;

        if (accessTokenCache && !forceRefresh) {
            return accessTokenCache;
        }

        const idToken = await user.getIdToken(true);

        const res = await fetch(
            `${import.meta.env.VITE_GATEWAY_URL}/v1/api/auth`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            }
        );

        if (!res.ok) {
            throw new Error('Auth failed');
        }

        const data = await res.json();
        accessTokenCache = data.accessToken;

        return accessTokenCache;
    };

    return {
        getAccessToken
    };
}