<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6">
    <div class="w-full max-w-sm">
      <h2 class="mb-10 text-center text-2xl/9 font-bold tracking-tight text-black">
        Sign in to your admin account
      </h2>

      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-black">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" placeholder="Email" autocomplete="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
          <div class="mt-2">
            <input type="password" name="password" id="password" placeholder="Password" autocomplete="current-password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6" />
          </div>
          <div class="mt-2 flex justify-end">
            <a href="#" class="text-sm font-semibold text-indigo-500 hover:text-indigo-400">Forgot password?</a>
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-800">
            Sign in
          </button>
        </div>
      </form>

      <div class="mt-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-3 text-xs text-gray-500 tracking-wide">Another</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <div class="mt-4">
        <button type="button" @click="handleGoogleLogin"
          class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100">
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


    navigateTo("/admin");


  } catch (error) {
    console.error("Login failed:", error);
  }

  definePageMeta({
    layout: 'auth-admin'  
  })

}
</script>