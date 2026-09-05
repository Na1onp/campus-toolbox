<script setup>
// SettingsView.vue = 设置页（v2）
// 三款主题色 + 深色模式 + 三语切换
import { state, t, setTheme, toggleDark, setLang } from '../store'

const themes = [
  { id: 'pink', icon: '🌸', labelKey: 'pinkTheme', color: '#f5c9b5' },
  { id: 'mint', icon: '🌿', labelKey: 'mintTheme', color: '#b8e0cf' },
  { id: 'blue', icon: '🌊', labelKey: 'blueTheme', color: '#bcd4ef' },
]
const langs = [
  { id: 'zhCN', label: '简体中文' },
  { id: 'zhTW', label: '繁體中文' },
  { id: 'en', label: 'English' },
]
</script>

<template>
  <div class="settings-page">
    <!-- 顶部返回 -->
    <div class="set-head">
      <button class="back-btn" @click="$router.back()">
        <span class="back-arrow">‹</span>
      </button>
      <span class="set-title">{{ t('settings') }}</span>
      <div style="width: 34px"></div>
    </div>

    <div class="page-sub">{{ t('themeColor') }}</div>

    <!-- 主题色三选 -->
    <div class="card theme-card">
      <div class="theme-options">
        <div
          v-for="th in themes"
          :key="th.id"
          class="theme-opt"
          :class="{ active: state.theme === th.id }"
          @click="setTheme(th.id)"
        >
          <div class="theme-swatch" :style="{ background: th.color }">{{ th.icon }}</div>
          <div class="theme-label">{{ t(th.labelKey) }}</div>
        </div>
      </div>
    </div>

    <!-- 深色模式开关 -->
    <div class="card setting-row" @click="toggleDark">
      <div class="row-left">
        <span class="row-icon">🌙</span>
        <span>{{ t('darkMode') }}</span>
      </div>
      <div class="switch" :class="{ on: state.dark }">
        <div class="knob"></div>
      </div>
    </div>

    <div class="page-sub sub2">{{ t('language') }}</div>

    <!-- 语言三选 -->
    <div class="card lang-card">
      <div
        v-for="lg in langs"
        :key="lg.id"
        class="lang-opt"
        :class="{ active: state.lang === lg.id }"
        @click="setLang(lg.id)"
      >
        <span>{{ lg.label }}</span>
        <span v-if="state.lang === lg.id" class="check">✓</span>
      </div>
    </div>

    <p class="version">{{ t('version') }}</p>
  </div>
</template>

<style scoped>
.settings-page { padding-top: 6px; }
.set-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 18px;
}
.back-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; }
.back-arrow { font-size: 34px; color: var(--c-text); line-height: 1; font-weight: 300; }
.set-title { font-size: 18px; font-weight: 600; color: var(--c-text); }
.page-sub { font-size: 14px; color: var(--c-text-sub); margin: 14px 2px 10px; }
.sub2 { margin-top: 22px; }

/* 主题 */
.theme-card { padding: 18px; }
.theme-options { display: flex; gap: 12px; }
.theme-opt {
  flex: 1; text-align: center; cursor: pointer;
  padding: 8px; border-radius: var(--radius-sm);
  transition: all 0.2s;
}
.theme-opt.active { background: var(--c-cream); }
.theme-swatch {
  width: 44px; height: 44px; border-radius: 14px;
  margin: 0 auto 6px; display: flex; align-items: center;
  justify-content: center; font-size: 20px;
  border: 2px solid transparent;
}
.theme-opt.active .theme-swatch { border-color: var(--c-primary-deep); }
.theme-label { font-size: 13px; color: var(--c-text); }

/* 深色开关行 */
.setting-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px; margin-top: 14px; cursor: pointer;
}
.row-left { display: flex; align-items: center; gap: 12px; font-size: 15px; color: var(--c-text); }
.row-icon { font-size: 20px; }
.switch {
  width: 48px; height: 28px; border-radius: 20px;
  background: var(--c-cream); position: relative; transition: background 0.3s;
}
.switch.on { background: var(--c-primary-deep); }
.knob {
  width: 22px; height: 22px; border-radius: 50%; background: #fff;
  position: absolute; top: 3px; left: 3px; transition: left 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.switch.on .knob { left: 23px; }

/* 语言 */
.lang-card { padding: 6px 16px; }
.lang-opt {
  display: flex; align-items: center; justify-content: space-between;
  padding: 15px 0; border-bottom: 1px solid rgba(200,180,170,0.15);
  cursor: pointer; font-size: 15px; color: var(--c-text);
}
.lang-opt:last-child { border-bottom: none; }
.lang-opt.active { color: var(--c-primary-deep); font-weight: 500; }
.check { font-weight: 700; }

.version { text-align: center; color: var(--c-text-light); font-size: 12px; margin-top: 24px; }
</style>
