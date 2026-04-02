<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your admin account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-black-100">Email address</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" placeholder=" Email" autocomplete="email"
                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-2 focus:border-black focus:outline-none sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-black-100">Password</label>

                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" placeholder="Password"
                            autocomplete="current-password"
                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-2 focus:border-black focus:outline-none sm:text-sm/6" />
                    </div>
                    <div class="mt-2 flex justify-end">
                        <a href="#" class="text-sm font-semibold text-indigo-500 hover:text-indigo-400">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Sign
                        in</button>
                </div>
            </form>
            <div class="mt-6 flex items-center">
                <div class="flex-1 border-t border-gray-300"></div>

                <span class="px-3 text-xs text-gray-500 tracking-wide">
                    Another
                </span>

                <div class="flex-1 border-t border-gray-300"></div>
            </div>
            <div class="mt-4">
                <button type="button" @click="handleGoogleLogin"
                    class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100 focus:outline-none">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5" />
                    Sign in with Google
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>


const router = useRouter();

const handleGoogleLogin = async () => {
   

    if (!process.client) return;
    try {
       const { signInWithPopup } = await import("firebase/auth");
        const { auth, provider } = await import("~/src/auth/firebase.js");

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        console.log("User:", user);

      navigateTo("/admin");


    } catch (error) {
        console.error("Login failed:", error);
    }
}
</script>