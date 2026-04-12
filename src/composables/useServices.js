import { ref } from 'vue'
import { auth } from '~/src/auth/firebase'


let accessTokenCache = null;

export default function useServices() {
    const services = ref([]);
    const loading = ref(false);

    const fetchServices = async (retry = true) => {
        if (process.server) return;

        loading.value = true;

        try {
            const user = auth.currentUser;

            if (!user) {
                return;
            }


            let accessToken = accessTokenCache;

            if (!accessToken) {
                const idToken = await user.getIdToken(true);


                const authRes = await fetch(
                    `${import.meta.env.VITE_GATEWAY_URL}/v1/api/auth`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idToken: idToken })
                    }
                );

                if (!authRes.ok) {
                    throw new Error("Auth failed");
                }

                const authData = await authRes.json();
                accessToken = authData.accessToken;
                accessTokenCache = accessToken;
                
            }

            const res = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services-all`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (res.status === 401 && retry) {
                accessTokenCache = null;
                loading.value = false;
                return await fetchServices(false);
            }

            if (!res.ok) {
                throw new Error("Fetch services failed");
            }

            const data = await res.json();
            services.value = data.data || [];

        } catch (error) {
            console.error('Fetch services error:', error);
        } finally {
            loading.value = false;
        }
    }

    return {
        services,
        loading,
        fetchServices
    }
}