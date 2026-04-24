<template>
  <div class="snow-container fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div 
      v-for="n in 40" 
      :key="n" 
      class="snowflake" 
      :style="snowflakeStyles[n-1]"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const snowflakeStyles = ref([]);

onMounted(() => {
  snowflakeStyles.value = Array.from({ length: 40 }).map(() => {
    const size = Math.random() * 4 + 2; // 2px to 6px
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const delay = Math.random() * -20; // Random start position
    const opacity = Math.random() * 0.4 + 0.1; // Subtle opacity
    const left = Math.random() * 100; // Random horizontal position
    const blur = Math.random() * 2; // Subtle blur for depth

    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    };
  });
});
</script>

<style scoped>
.snow-container {
  background: transparent;
  z-index: 9999; /* Đưa lên trên cùng để không bị các thành phần khác che khuất */
}


.snowflake {
  position: absolute;
  top: -10px;
  background-color: white;
  border-radius: 50%;
  animation: fall linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Chế độ SÁNG: Tuyết màu xám xanh để nổi trên nền trắng */
:global(html:not(.dark)) .snowflake {
  background-color: #94a3b8 !important;
  box-shadow: 0 0 8px rgba(148, 163, 184, 0.4) !important;
}

/* Chế độ TỐI: Tuyết trắng tinh khôi */
:global(html.dark) .snowflake {
  background-color: #ffffff !important;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6) !important;
}

@keyframes fall {

  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(25vh) translateX(15px) rotate(90deg);
  }
  50% {
    transform: translateY(50vh) translateX(-15px) rotate(180deg);
  }
  75% {
    transform: translateY(75vh) translateX(10px) rotate(270deg);
  }
  100% {
    transform: translateY(110vh) translateX(0) rotate(360deg);
  }
}
</style>
