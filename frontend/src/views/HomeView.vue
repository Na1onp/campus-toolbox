<script setup>
// HomeView.vue = 首页（v2）
// 设计：1) 问候区  2) 今日课表"大头"卡片  3) 11个工具宫格（全部功能）
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { state, tools, t } from '../store'

// 问候语随时间变化
const now = new Date()
const greetingKey = '嗨，同学！'

// 今日演示课程
const todayCourses = [
  { time: '08:00', name: '高等数学', room: '教1-101' },
  { time: '10:00', name: '大学英语', room: '教2-305' },
  { time: '14:00', name: '大学物理', room: '实3-201' },
]

const weekDay = ['周日','周一','周二','周三','周四','周五','周六'][now.getDay()]
const todayLabel = `${now.getMonth()+1}月${now.getDate()}日 · ${weekDay}`
</script>

<template>
  <div class="home">
    <!-- 问候区 -->
    <section class="hero">
      <h1 class="hero-title">{{ greetingKey }}</h1>
      <p class="hero-sub">{{ t('slogan') }}</p>
      <div class="hero-date">{{ todayLabel }}</div>
    </section>

    <!-- 今日课表（占大头，核心） -->
    <section class="card schedule-hero">
      <div class="schedule-head">
        <h2 class="schedule-title">{{ t('todaySchedule') }}</h2>
        <RouterLink to="/schedule" class="more-link">›</RouterLink>
      </div>
      <div class="today-courses">
        <div v-for="c in todayCourses" :key="c.time" class="tc-row">
          <div class="tc-time">{{ c.time }}</div>
          <div class="tc-info">
            <div class="tc-name">{{ c.name }}</div>
            <div class="tc-room">{{ c.room }}</div>
          </div>
          <div class="tc-dot"></div>
        </div>
      </div>
      <RouterLink to="/schedule" class="full-schedule">{{ t('tabSchedule') }} →</RouterLink>
    </section>

    <!-- 全部工具（11宫格） -->
    <section class="tools-section">
      <h2 class="tools-title">{{ t('allTools') }}</h2>
      <div class="tools-grid">
        <RouterLink
          v-for="tool in tools"
          :key="tool.id"
          :to="tool.route"
          class="tool-card"
        >
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-name">{{ t(tool.key) }}</div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 问候 */
.hero { padding: 4px 2px 16px; }
.hero-title { font-size: 30px; font-weight: 600; color: var(--c-text); }
.hero-sub { font-size: 14px; color: var(--c-text-sub); margin-top: 2px; }
.hero-date {
  display: inline-block; margin-top: 8px; font-size: 12px;
  color: var(--c-text-sub); background: rgba(255,255,255,0.7);
  padding: 4px 12px; border-radius: 20px;
}

/* 今日课表大头卡片 */
.schedule-hero {
  margin-bottom: 20px;
  background: linear-gradient(150deg, var(--c-primary-light), var(--c-white));
  border: 1px solid var(--c-primary);
}
.schedule-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.schedule-title { font-size: 20px; font-weight: 600; color: var(--c-text); }
.more-link { font-size: 28px; color: var(--c-primary-deep); line-height: 1; text-decoration: none; }
.today-courses { display: flex; flex-direction: column; }
.tc-row {
  display: flex; align-items: center; gap: 14px;
  padding: 11px 0; border-bottom: 1px solid rgba(200,180,170,0.15);
}
.tc-row:last-child { border-bottom: none; }
.tc-time {
  font-size: 13px; font-weight: 600; color: var(--c-primary-deep);
  width: 52px; flex-shrink: 0;
}
.tc-info { flex: 1; }
.tc-name { font-weight: 600; font-size: 16px; color: var(--c-text); }
.tc-room { font-size: 12px; color: var(--c-text-sub); }
.tc-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--c-primary-deep); flex-shrink: 0;
}
.full-schedule {
  display: block; text-align: center; margin-top: 12px;
  color: var(--c-primary-deep); font-size: 14px; font-weight: 500;
}

/* 全部工具宫格 */
.tools-section { margin-top: 4px; }
.tools-title { font-size: 18px; font-weight: 600; color: var(--c-text); margin-bottom: 12px; }
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tool-card {
  background: var(--c-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  padding: 18px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: transform 0.2s;
  border: 1px solid var(--c-card-border);
}
.tool-card:hover { transform: translateY(-3px); }
.tool-icon { font-size: 26px; }
.tool-name { font-size: 13px; font-weight: 500; color: var(--c-text); text-align: center; }
</style>
