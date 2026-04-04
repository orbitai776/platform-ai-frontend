<template>
  <nav class="bg-blue-100 text-black shadow-md">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold">Platform test pipeline</div>
      <ul class="flex space-x-6 items-center">
        <li>
          <NuxtLink to="/" class="hover:text-blue-600 transition font-medium">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile" class="hover:text-blue-600 transition font-medium">Profile</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/Login" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-md font-semibold text-sm flex items-center">
            Login
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
