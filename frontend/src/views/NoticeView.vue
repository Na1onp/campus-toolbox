<script setup>
// NoticeView.vue = 校园公告页（v2）
import { ref } from 'vue'
import { t } from '../store'

// 演示公告数据
const notices = ref([
  { id: 1, title: '关于2026年秋季学期开学的通知', date: '2026-09-01', tag: '教务', content: '各位同学：新学期将于9月7日正式开始，请同学们按时返校，做好开学准备。' },
  { id: 2, title: '2026年下半年全国大学英语四六级考试报名通知', date: '2026-09-03', tag: '考试', content: '四六级报名将于9月10日开始，请需要报考的同学留意报名时间，逾期不予补报。' },
  { id: 3, title: '图书馆中秋假期开放时间安排', date: '2026-09-05', tag: '后勤', content: '中秋假期图书馆开放时间为9:00-17:00，假期注意合理安排学习时间。' },
  { id: 4, title: '关于组织2026年秋季助学金申请的通知', date: '2026-09-04', tag: '学工', content: '符合条件的同学可登录学工系统提交助学金申请，截止日期为9月20日。' },
  { id: 5, title: '校医院体检安排通知', date: '2026-09-02', tag: '后勤', content: '新生入学体检安排在9月10日至12日，请各学院按批次前往校医院体检。' },
])

const selected = ref(null)

function openNotice(n) {
  selected.value = n
}
function closeDetail() {
  selected.value = null
}
</script>

<template>
  <div class="notice-page">
    <div class="page-head">
      <h1 class="page-title">{{ t('tabNotice') }}</h1>
      <p class="page-sub">学校的通知、考试、后勤信息都在这</p>
    </div>

    <!-- 公告列表 -->
    <div class="notice-list">
      <div
        v-for="n in notices"
        :key="n.id"
        class="notice-card"
        @click="openNotice(n)"
      >
        <div class="notice-tag">{{ n.tag }}</div>
        <div class="notice-body">
          <div class="notice-title">{{ n.title }}</div>
          <div class="notice-date">{{ n.date }}</div>
        </div>
        <div class="notice-arrow">›</div>
      </div>
    </div>

    <!-- 详情弹层 -->
    <div v-if="selected" class="modal-mask" @click.self="closeDetail">
      <div class="modal-card card">
        <div class="modal-head">
          <span class="notice-tag">{{ selected.tag }}</span>
          <button class="close-btn" @click="closeDetail">✕</button>
        </div>
        <h2 class="modal-title">{{ selected.title }}</h2>
        <div class="modal-date">{{ selected.date }}</div>
        <p class="modal-content">{{ selected.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-head {
  padding: 4px 2px 16px;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.notice-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--c-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}
.notice-card:hover {
  transform: translateY(-2px);
}
.notice-tag {
  background: linear-gradient(135deg, var(--c-primary), var(--c-gold));
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 8px;
  flex-shrink: 0;
  font-weight: 500;
}
.notice-body {
  flex: 1;
}
.notice-title {
  font-weight: 500;
  font-size: 15px;
  color: var(--c-text);
}
.notice-date {
  font-size: 12px;
  color: var(--c-text-light);
  margin-top: 3px;
}
.notice-arrow {
  color: var(--c-text-light);
  font-size: 20px;
}

/* 详情弹层 */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 200;
}
.modal-card {
  width: 100%;
  max-width: 420px;
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--c-text-sub);
  cursor: pointer;
}
.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 6px;
}
.modal-date {
  font-size: 12px;
  color: var(--c-text-light);
  margin-bottom: 14px;
}
.modal-content {
  font-size: 15px;
  color: var(--c-text-sub);
  line-height: 1.8;
}
</style>