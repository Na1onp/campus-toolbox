<script setup>
// ScheduleView.vue = 课程表页（核心功能，v2）
// 第一版：显示本周课表（用演示数据），后续接后端数据库
import { t } from '../store'

// 演示数据：模拟一周课表
// 结构：[星期几 0-6][第几节课 0-...]
const weekDays = ['周一', '周二', '周三', '周四', '周五']
const periods = ['第1-2节\n08:00', '第3-4节\n10:00', '第5-6节\n14:00', '第7-8节\n16:00']

// 模拟课程分布（课表网格内容）
const schedule = {
  '0-0': { name: '高等数学', room: '教1-101' },
  '0-2': { name: '程序设计', room: '机房3' },
  '1-0': { name: '大学英语', room: '教2-305' },
  '1-1': { name: '体育', room: '操场' },
  '2-2': { name: '大学物理', room: '实3-201' },
  '3-1': { name: '高等数学', room: '教1-101' },
  '3-3': { name: '思想道德', room: '教2-108' },
  '4-0': { name: '大学英语', room: '教2-305' },
  '4-3': { name: '班会', room: '教1-205' },
}

// 取某格子的课程
function getCourse(day, period) {
  return schedule[`${day}-${period}`]
}
</script>

<template>
  <div class="schedule-page">
    <div class="page-head">
      <p class="page-sub">本周课表 · 第 1 周</p>
    </div>

    <!-- 课表网格 -->
    <div class="table-wrap">
      <table class="schedule-table">
        <thead>
          <tr>
            <th class="time-col"></th>
            <th v-for="d in weekDays" :key="d" class="day-head">{{ d }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, pi) in periods" :key="p">
            <td class="period-cell">
              <span class="period-main">{{ p.split('\n')[0] }}</span>
              <span class="period-time">{{ p.split('\n')[1] }}</span>
            </td>
            <td
              v-for="(d, di) in weekDays"
              :key="d"
              class="course-cell"
            >
              <!-- 有课显示课程 -->
              <div v-if="getCourse(di, pi)" class="course-block">
                <div class="cb-name">{{ getCourse(di, pi).name }}</div>
                <div class="cb-room">{{ getCourse(di, pi).room }}</div>
              </div>
              <!-- 没课显示空 -->
              <div v-else class="empty-block"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 操作提示（后续加：导入/手动添加） -->
    <div class="tip-card">
      <p>💡 课程表目前展示的是示例数据。</p>
      <p>后续版本会支持手动添加 / 一键导入教务课表。</p>
    </div>
  </div>
</template>

<style scoped>
.page-head {
  padding: 4px 2px 16px;
}

/* 表格外层滚动（手机端课表横向可滑动） */
.table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  background: var(--c-white);
  box-shadow: var(--shadow-soft);
  padding: 4px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.time-col {
  width: 40px;
}
.day-head {
  padding: 10px 4px;
  font-weight: 600;
  color: var(--c-text);
  text-align: center;
  border-bottom: 2px solid var(--c-cream);
}
.period-cell {
  text-align: center;
  padding: 8px 2px;
  font-weight: 500;
  color: var(--c-text-sub);
  border-bottom: 1px solid var(--c-cream);
}
.period-main {
  display: block;
  font-size: 11px;
}
.period-time {
  display: block;
  font-size: 10px;
  color: var(--c-text-light);
}
.course-cell {
  border: 1px solid var(--c-cream);
  text-align: center;
  vertical-align: middle;
  height: 52px;
  padding: 3px;
}
.course-block {
  background: linear-gradient(135deg, #fbe4d8, #f6cdbd);
  border-radius: 10px;
  padding: 6px 3px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cb-name {
  font-weight: 600;
  color: var(--c-text);
  font-size: 12px;
}
.cb-room {
  font-size: 10px;
  color: var(--c-text-sub);
}
.empty-block {
  height: 100%;
}

/* 提示卡片 */
.tip-card {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  font-size: 13px;
  color: var(--c-text-sub);
}
</style>