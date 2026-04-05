<template>
  <nav class="bg-[#0d0d12] sticky top-0 z-[100]">
    <div class="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">

      <!-- Logo -->
      <div class="font-['Sora'] font-extrabold text-[1.2rem] text-white tracking-tight flex items-center gap-2">
        <span class="w-2 h-2 bg-[#e8604c] rounded-full inline-block"></span>
        Orbit AI
      </div>

      <!-- Nav Links -->
      <ul class="hidden md:flex gap-8 list-none m-0 p-0">
        <li>
          <a href="/about" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Home</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tính năng</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Báo giá</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Demo</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tin tức</a>
        </li>
        <li>
          <a href="/news" class="hover:text-accent transition">News</a>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <a href="/profile" class="hidden sm:inline-block text-white/65 text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-white/20 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:text-white hover:border-white/50 no-underline">
          Profile
        </a>
        <a href="#" class="bg-[#e8604c] text-white px-5 py-2 rounded-sm text-[0.8rem] font-semibold font-['Sora'] tracking-[0.06em] uppercase no-underline transition-all duration-200 hover:bg-[#d94e3a] hover:-translate-y-px">
          Tư vấn miễn phí →
        </a>
      </div>

    </div>
  </nav>
</template>
