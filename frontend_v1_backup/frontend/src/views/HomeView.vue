<script setup>
// HomeView.vue = 首页（用户打开看到的第一个页面）
// 第一版只做"框架 + 演示数据"，后面再接后端真实数据
import { RouterLink } from 'vue-router'

// 演示数据：今日课程（后续换成后端真实课表）
const todayCourses = [
  { id: 1, name: '高等数学', time: '08:00-09:40', room: '教1-101', teacher: '王老师' },
  { id: 2, name: '大学英语', time: '10:00-11:40', room: '教2-305', teacher: '李老师' },
  { id: 3, name: '大学物理', time: '14:00-15:40', room: '实3-201', teacher: '张老师' },
]

// 演示数据：最新公告（后续换成后端真实公告）
const latestNotices = [
  { id: 1, title: '2026年秋季学期开学通知', date: '09-01' },
  { id: 2, title: '全国大学英语四六级考试报名通知', date: '09-03' },
  { id: 3, title: '图书馆中秋假期开放安排', date: '09-05' },
]
</script>

<template>
  <div class="home">
    <!-- 顶部问候大标题（参考咖啡品牌的大字标题风格） -->
    <section class="hero">
      <h1 class="hero-title">嗨，同学！</h1>
      <p class="hero-sub">校园生活，从这里开始更简单</p>
      <div class="hero-date">今天 · 9月6日 · 周日</div>
    </section>

    <!-- 功能入口：点击跳转到对应模块 -->
    <section class="feature-grid">
      <RouterLink to="/schedule" class="feature-card">
        <div class="feature-icon">📚</div>
        <div class="feature-name">课程表</div>
        <div class="feature-desc">查课上课不迷路</div>
      </RouterLink>
      <RouterLink to="/notice" class="feature-card">
        <div class="feature-icon">📰</div>
        <div class="feature-name">校园资讯</div>
        <div class="feature-desc">重要通知不错过</div>
      </RouterLink>
      <RouterLink to="/profile" class="feature-card">
        <div class="feature-icon">👤</div>
        <div class="feature-name">我的</div>
        <div class="feature-desc">账号与设置</div>
      </RouterLink>
    </section>

    <!-- 今日课程预览 -->
    <section class="card section">
      <div class="section-head">
        <h2 class="section-title">今日课程</h2>
        <RouterLink to="/schedule" class="more-link">查看全部 →</RouterLink>
      </div>
      <div class="course-list">
        <div v-for="c in todayCourses" :key="c.id" class="course-item">
          <div class="course-time">{{ c.time }}</div>
          <div class="course-info">
            <div class="course-name">{{ c.name }}</div>
            <div class="course-meta">{{ c.room }} · {{ c.teacher }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新公告预览 -->
    <section class="card section">
      <div class="section-head">
        <h2 class="section-title">最新公告</h2>
        <RouterLink to="/notice" class="more-link">查看全部 →</RouterLink>
      </div>
      <ul class="notice-list">
        <li v-for="n in latestNotices" :key="n.id" class="notice-item">
          <span class="notice-dot"></span>
          <span class="notice-title">{{ n.title }}</span>
          <span class="notice-date">{{ n.date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* 顶部问候区 */
.hero {
  padding: 12px 4px 20px;
}
.hero-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--c-text);
}
.hero-sub {
  font-size: 15px;
  color: var(--c-text-sub);
  margin-top: 4px;
}
.hero-date {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  color: var(--c-text-sub);
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 12px;
  border-radius: 20px;
}

/* 功能入口网格 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.feature-card {
  background: var(--c-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 18px 12px;
  text-align: center;
  transition: transform 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
.feature-card:hover {
  transform: translateY(-3px);
}
.feature-icon {
  font-size: 30px;
}
.feature-name {
  font-weight: 600;
  font-size: 15px;
  color: var(--c-text);
  margin-top: 8px;
}
.feature-desc {
  font-size: 11px;
  color: var(--c-text-sub);
  margin-top: 2px;
}

/* 通用区块卡片 */
.section {
  margin-bottom: 16px;
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
}
.more-link {
  font-size: 13px;
  color: var(--c-text-sub);
}

/* 今日课程列表 */
.course-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(232, 168, 146, 0.15);
}
.course-item:last-child {
  border-bottom: none;
}
.course-time {
  font-size: 13px;
  color: var(--c-text-sub);
  width: 92px;
  flex-shrink: 0;
}
.course-name {
  font-weight: 500;
  font-size: 16px;
  color: var(--c-text);
}
.course-meta {
  font-size: 12px;
  color: var(--c-text-sub);
}

/* 公告列表 */
.notice-list {
  list-style: none;
}
.notice-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(232, 168, 146, 0.15);
}
.notice-item:last-child {
  border-bottom: none;
}
.notice-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-primary-deep);
  flex-shrink: 0;
}
.notice-title {
  flex: 1;
  font-size: 14px;
  color: var(--c-text);
}
.notice-date {
  font-size: 12px;
  color: var(--c-text-light);
}
</style>