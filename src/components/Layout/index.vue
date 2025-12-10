<script setup lang="ts">
import DotGrid from '@/blocks/Backgrounds/DotGrid/DotGrid.vue';

interface Props {
  title?: string;
  description?: string;
  level?: string;
}

const props = withDefaults(defineProps<Props>(), {
  raysOrigin: 'top-center',
  title: '',
  description: '',
  level: ''
});

const router = useRouter();
const mainRef = ref<HTMLElement>();
const isScrolled = ref(false);

const handleScroll = () => {
  if (mainRef.value) {
    isScrolled.value = mainRef.value.scrollTop > 0;
  }
};

const levelColor = computed(() => {
  switch (props.level) {
    case '入门':
      return 'green';
    case '进阶':
      return 'blue';
    case '高级':
      return 'orange';
    default:
      return 'blue';
  }
});

const goBack = () => {
  router.push('/demos');
};
</script>

<template>
  <div class="demo-layout">
    <!-- 背景动画 -->
    <DotGrid
      :dot-size="5"
      :gap="15"
      base-color="#333333"
      active-color="#27FF64"
      :proximity="120"
      :speed-trigger="100"
      :shock-radius="250"
      :shock-strength="5"
      :max-speed="5000"
      :resistance="750"
      :return-duration="1.5"
      class="background-rays"
    />
    <!-- 顶部导航栏 -->
    <header class="layout-header" :class="{ 'is-scrolled': isScrolled }">
      <AButton type="text" class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span>Back</span>
      </AButton>
      <div v-if="title" class="header-info">
        <h1 class="layout-title">{{ title }}</h1>
        <p v-if="description" class="layout-desc">{{ description }}</p>
      </div>
      <div class="header-actions">
        <slot name="actions" />
        <ATag v-if="level" :color="levelColor">{{ level }}</ATag>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main ref="mainRef" class="layout-main" @scroll="handleScroll">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.demo-layout {
  position: relative;
  height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.background-rays {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.6;
  pointer-events: none;
}

.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-header.is-scrolled {
  background-image: radial-gradient(transparent 1px, rgba(10, 10, 10, 0.9) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }

  .back-icon {
    font-size: 18px;
  }
}

.header-info {
  flex: 1;
}

.layout-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
}

.layout-desc {
  margin: 4px 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.layout-main {
  position: relative;
  z-index: 5;
  height: 100%;
  padding: 24px;
  padding-top: 80px;
  overflow-x: hidden;
}
</style>
