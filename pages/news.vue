<template>
  <section class="min-h-screen bg-white text-slate-900 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Blog News</h1>
        <button
          class="border border-sky-500 text-sky-400 px-4 py-2 rounded-lg hover:bg-sky-500/10 transition"
        >
          View all
        </button>
      </div>
      <div
        v-if="newsList.length"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <NuxtLink
          v-for="news in newsList"
          :key="news._id.$oid"
          :to="`/newdetail/${news._id.$oid}`"
          class="block"
        >
          <article
            class="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:scale-[1.02] hover:border-sky-500/50 transition duration-300"
          >
            <div
              class="h-48 bg-gradient-to-br from-sky-100 via-indigo-100 to-slate-200 flex items-center justify-center text-lg font-semibold"
            >
              {{ news.title }}
            </div>

            <div class="p-5 space-y-3">
              <div class="flex items-start justify-between gap-3">
                <h2 class="text-xl font-semibold leading-snug line-clamp-2">
                  {{ news.title }}
                </h2>
                <span
                  class="text-xs px-3 py-1 rounded-full border"
                  :class="
                    news.status === 'published'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-amber-500 text-amber-400'
                  "
                >
                  {{ news.status }}
                </span>
              </div>

              <p class="text-sm text-slate-500">
                {{ formatDate(news.published_at) }}
              </p>

              <p class="text-slate-700 line-clamp-3">
                {{ news.body }}
              </p>

              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tag in news.tags"
                  :key="tag"
                  class="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-md"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </article>
        </NuxtLink>
      </div>
      <div v-else class="text-center py-16 text-slate-500">No news found.</div>
    </div>
  </section>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { auth } from '../src/auth/firebase'

const accessToken = ref('')
onMounted(async () => {
  try {
   const user = auth.currentUser;
    if (!user) {
      console.error('Chưa đăng nhập Firebase')
      return
    }
    const idToken = await user.getIdToken()
    const authRes = await fetch(
      'https://platform-gateway-dev.orbitai.fun/v1/api/auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      }
    )
    const authData = await authRes.json()
    accessToken.value = authData.accessToken
    const updateRes = await fetch(
      'https://platform-gateway-dev.orbitai.fun/v1/api/partner/organization',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'New Organization Name',
          phone: '1234567890',
          address: '123 New Address, City, Country'
        })
      }
    )
    const updateData = await updateRes.json()
    console.log('Cập nhật tổ chức thành công:', updateData)
  } catch (err) {
    console.error('Lỗi API:', err)
  }
})


const route = useRoute();

const newsList = [
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482b1",
    },
    title: "Tin tức 14",
    slug: "tin-tuc-14",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.599Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.599Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.599Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482c6",
    },
    title: "Tin tức 35",
    slug: "tin-tuc-35",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "published",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: null,
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482df",
    },
    title: "Tin tức 60",
    slug: "tin-tuc-60",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482e4",
    },
    title: "Tin tức 65",
    slug: "tin-tuc-65",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "published",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: null,
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e148300",
    },
    title: "Tin tức 93",
    slug: "tin-tuc-93",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "published",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: null,
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e148301",
    },
    title: "Tin tức 94",
    slug: "tin-tuc-94",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482bd",
    },
    title: "Tin tức 26",
    slug: "tin-tuc-26",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.599Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482cb",
    },
    title: "Tin tức 40",
    slug: "tin-tuc-40",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482da",
    },
    title: "Tin tức 55",
    slug: "tin-tuc-55",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "published",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: null,
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482dd",
    },
    title: "Tin tức 58",
    slug: "tin-tuc-58",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e1482e9",
    },
    title: "Tin tức 70",
    slug: "tin-tuc-70",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
  {
    _id: {
      $oid: "69ce264233c6cfc31e148301",
    },
    title: "Tin tức 99",
    slug: "tin-tuc-99",
    body: "Nội dung bài viết...",
    cover_image: null,
    tags: ["du lịch", "AI", "booking"],
    status: "draft",
    author_id: "d2c77fd2-a90f-4f6d-8d03-bd2798614c59",
    published_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    created_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
    updated_at: {
      $date: "2026-04-02T08:18:10.600Z",
    },
  },
];

const formatDate = (date) => {
  if (!date?.$date) return "N/A";
  return new Date(date.$date).toLocaleDateString("vi-VN");
};
</script>
