<template>
    <div class="container mx-auto pl-12 pr-12 pt-8">
        <h1 class="text-3xl font-bold mb-4">{{ news.title }}</h1>
        <p class="text-gray-600 mb-2">
            Published At: {{ formatDate(news.published_at) }} | Author ID: {{ news.author_id }}
        </p>
        <div class="mb-4">
            <span
                v-for="tag in news.tags"
                :key="tag"
                class="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2 text-sm"
            >
                {{ tag }}
            </span>
        </div>
        <p>{{ news.body }}</p>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const newsId = route.params.id;
console.log(newsId);
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

const news = newsList.find((item) => item._id.$oid === newsId) || {
    title: "Không tìm thấy bài viết",
    published_at: null,
    author_id: "N/A",
    tags: [],
    body: "N/A",
};

const formatDate = (date) => {
    if (!date?.$date) return "N/A";
    return new Date(date.$date).toLocaleDateString("vi-VN");
};
</script>