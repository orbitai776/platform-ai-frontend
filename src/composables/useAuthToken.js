import { auth } from '~/src/auth/firebase'
import { onAuthStateChanged } from 'firebase/auth'

let accessTokenCache = null;

export function useAuthToken() {

    const waitForAuth = () => {
        return new Promise((resolve) => {
            if (auth.currentUser) return resolve(auth.currentUser);
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    const getAccessToken = async (forceRefresh = false) => {
        if (process.server) return null;

        const user = await waitForAuth();
        if (!user) return null;

        if (accessTokenCache && !forceRefresh) {
            return accessTokenCache;
        }

        try {
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
        } catch (e) {
            console.error('Token fetch error:', e);
            return null;
        }
    };

    return {
        getAccessToken
    };
}