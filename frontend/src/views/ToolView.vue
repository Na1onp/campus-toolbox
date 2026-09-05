<script setup>
// ToolView.vue = 通用功能占位页（v2）
// 11个功能里除"课程表/资讯"外，其余9个工具暂用此页展示"建设中"
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tools, t } from '../store'

const route = useRoute()
const toolId = computed(() => route.params.id)

// 找对应工具定义
const tool = computed(() => tools.find(x => x.id === toolId.value))
</script>

<template>
  <div class="tool-page">
    <!-- 返回栏（App 外层已提供 back-btn，这里只放内容标题区即可，避免重复）
         但为清晰，这里放一个图标 + 名称 -->
    <div class="tool-hero">
      <div class="tool-big-icon">{{ tool?.icon || '🧰' }}</div>
      <h1 class="tool-title">{{ tool ? t(tool.key) : '' }}</h1>
      <p class="tool-sub">{{ tool ? t(tool.sub) : '' }}</p>
    </div>

    <!-- 建设中提示 -->
    <div class="card coming-card">
      <div class="building-icon">🛠️</div>
      <h2 class="coming-title">{{ t('comingSoon') }}</h2>
      <p class="coming-sub">{{ t('comingSoonSub') }}</p>
      <div class="progress-line"><div class="progress-fill"></div></div>
    </div>
  </div>
</template>

<style scoped>
.tool-hero { text-align: center; padding: 20px 0 24px; }
.tool-big-icon { font-size: 56px; }
.tool-title { font-size: 24px; font-weight: 600; color: var(--c-text); margin-top: 8px; }
.tool-sub { font-size: 14px; color: var(--c-text-sub); margin-top: 4px; }

.coming-card { text-align: center; padding: 36px 20px; }
.building-icon { font-size: 44px; }
.coming-title { font-size: 19px; font-weight: 600; color: var(--c-text); margin-top: 12px; }
.coming-sub { font-size: 14px; color: var(--c-text-sub); margin: 8px 0 20px; }
.progress-line {
  width: 100%; height: 6px; border-radius: 3px;
  background: var(--c-cream); overflow: hidden;
}
.progress-fill {
  width: 35%; height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
}
</style>
