<script setup>
// App.vue = 应用外壳（v2）
// 职责：1) 顶部栏(正常页) 或 返回栏(二级页)  2) 中间内容区  3) 底部4栏导航
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { state, t } from './store'

const route = useRoute()

// 当前页是否要显示"底部4栏导航"
const showBottom = computed(() => route.meta.showBottom === true)
// 当前页是否是"二级页"(要显示顶部返回箭头)
const isBackPage = computed(() => route.meta.back === true)
// 当前页是否完全隐藏顶部(登录/设置等全屏页用自己布局) —— 这里让返回页也保留顶部返回
</script>

<template>
  <div class="app-shell">
    <!-- 顶部：二级页显示"返回栏"，首页/主tab显示"品牌栏" -->
    <header class="topbar">
      <!-- 返回箭头（二级页） -->
      <div v-if="isBackPage" class="topbar-inner back-layout">
        <button class="back-btn" @click="$router.back()">
          <span class="back-arrow">‹</span>
        </button>
        <RouterLink to="/" class="brand-mini">
          <span class="brand-icon">🏫</span>
          <span class="brand-name-mini">{{ t('appName') }}</span>
        </RouterLink>
      </div>
      <!-- 品牌栏（首页等） -->
      <div v-else-if="!route.meta.noBottom" class="topbar-inner">
        <RouterLink to="/" class="brand">
          <span class="brand-icon">🏫</span>
          <span class="brand-name">{{ t('appName') }}</span>
        </RouterLink>
        <div class="topbar-right">
          <template v-if="state.user">
            <span class="user-chip">{{ state.user.phone }}</span>
          </template>
          <template v-else>
            <RouterLink to="/login" class="login-link">{{ t('login') }}</RouterLink>
          </template>
        </div>
      </div>
    </header>

    <!-- 页面主体 -->
    <main class="main-content" :class="{ 'no-pad-bottom': !showBottom }">
      <RouterView />
    </main>

    <!-- 底部导航（主 tab 页显示） -->
    <nav v-if="showBottom" class="bottom-nav">
      <RouterLink to="/" class="nav-item" exact-active-class="router-link-active">
        <span class="nav-icon">🏠</span>
        <span>{{ t('tabHome') }}</span>
      </RouterLink>
      <RouterLink to="/schedule" class="nav-item" active-class="router-link-active">
        <span class="nav-icon">📚</span>
        <span>{{ t('tabSchedule') }}</span>
      </RouterLink>
      <RouterLink to="/notice" class="nav-item" active-class="router-link-active">
        <span class="nav-icon">📰</span>
        <span>{{ t('tabNotice') }}</span>
      </RouterLink>
      <RouterLink to="/profile" class="nav-item" active-class="router-link-active">
        <span class="nav-icon">👤</span>
        <span>{{ t('tabProfile') }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶栏 */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--c-topbar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(200, 180, 170, 0.15);
}
.topbar-inner {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
}
.brand { display: flex; align-items: center; gap: 8px; }
.brand-icon { font-size: 22px; }
.brand-name { font-size: 18px; font-weight: 600; color: var(--c-text); }

/* 返回布局 */
.back-layout { justify-content: flex-start; gap: 10px; }
.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}
.back-arrow {
  font-size: 34px;
  color: var(--c-text);
  line-height: 1;
  font-weight: 300;
}
.brand-mini { display: flex; align-items: center; gap: 6px; }
.brand-name-mini { font-size: 16px; font-weight: 600; color: var(--c-text); }

.login-link {
  font-size: 15px;
  color: var(--c-text-sub);
  background: var(--c-white);
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
  transition: all 0.2s;
}
.user-chip {
  font-size: 13px;
  color: var(--c-text-sub);
  background: var(--c-white);
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
}

/* 主内容 */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 16px 30px;
}
.main-content.no-pad-bottom { padding-bottom: 30px; }

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: space-around;
  background: var(--c-nav-bg);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(200, 180, 170, 0.15);
  padding: 8px 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 14px;
  font-size: 11px;
  color: var(--c-text-sub);
  border-radius: 12px;
  transition: all 0.2s;
}
.nav-icon { font-size: 20px; }
.nav-item.router-link-active {
  color: var(--c-primary-deep);
  background: var(--c-primary-light);
}
</style>
