<script setup>
// ProfileView.vue = "我的"页（个人中心）
// 第一版：显示登录状态，账号相关的完整功能后续接后端
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 读取本地登录状态（登录页写入的模拟标记）
const user = ref(JSON.parse(localStorage.getItem('campus_login') || 'null'))

const isLoggedIn = computed(() => !!user.value)

// 登出（含二次确认）
const showLogoutConfirm = ref(false)

function requestLogout() {
  // 触发二次确认弹窗（产品要求：登出需二次确认）
  showLogoutConfirm.value = true
}
function doLogout() {
  localStorage.removeItem('campus_login')
  user.value = null
  showLogoutConfirm.value = false
  router.push('/')
}
function cancelLogout() {
  showLogoutConfirm.value = false
}

// 设置项（第一版为占位，主题色/三语切换后面做）
const settings = [
  { icon: '🎨', name: '主题颜色', desc: '选择你喜欢的主题色', action: '›' },
  { icon: '🌙', name: '深色模式', desc: '夜间使用更护眼', action: '›' },
  { icon: '🌐', name: '语言 / Language', desc: '简体中文 · English', action: '›' },
]
</script>

<template>
  <div class="profile-page">
    <div class="page-head">
      <h1 class="page-title">我的</h1>
    </div>

    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="card guest-card">
      <div class="guest-icon">👤</div>
      <p class="guest-text">登录后同步你的课表与收藏</p>
      <button class="btn-primary" @click="router.push('/login')">去登录</button>
    </div>

    <!-- 已登录状态 -->
    <div v-else>
      <div class="card user-card">
        <div class="avatar">👨‍🎓</div>
        <div class="user-info">
          <div class="user-name">同学</div>
          <div class="user-id">学号：{{ user.studentId }}</div>
        </div>
        <button class="logout-link" @click="requestLogout">退出</button>
      </div>
    </div>

    <!-- 设置列表 -->
    <div class="card settings-card">
      <div v-for="s in settings" :key="s.name" class="setting-item">
        <span class="set-icon">{{ s.icon }}</span>
        <div class="set-body">
          <div class="set-name">{{ s.name }}</div>
          <div class="set-desc">{{ s.desc }}</div>
        </div>
        <span class="set-arrow">{{ s.action }}</span>
      </div>
    </div>

    <!-- 版本信息 -->
    <p class="version">校园工具箱 v0.1 · 开发预览版</p>

    <!-- 登出二次确认弹窗 -->
    <div v-if="showLogoutConfirm" class="confirm-mask">
      <div class="confirm-card card">
        <h3 class="confirm-title">确认退出？</h3>
        <p class="confirm-text">退出后需重新登录才能查看你的课表</p>
        <div class="confirm-btns">
          <button class="btn-cancel" @click="cancelLogout">再想想</button>
          <button class="btn-danger" @click="doLogout">确认退出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-head {
  padding: 4px 2px 16px;
}

/* 未登录 */
.guest-card {
  text-align: center;
  padding: 40px 20px;
}
.guest-icon {
  font-size: 50px;
}
.guest-text {
  color: var(--c-text-sub);
  margin: 12px 0 20px;
}

/* 已登录 */
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--c-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}
.user-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
}
.user-id {
  font-size: 13px;
  color: var(--c-text-sub);
}
.logout-link {
  margin-left: auto;
  background: none;
  border: 1px solid #e5c3b8;
  color: #b97c6a;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

/* 设置 */
.settings-card {
  padding: 6px 16px;
}
.setting-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(232, 168, 146, 0.15);
  cursor: pointer;
}
.setting-item:last-child {
  border-bottom: none;
}
.set-icon {
  font-size: 22px;
}
.set-name {
  font-weight: 500;
  color: var(--c-text);
  font-size: 15px;
}
.set-desc {
  font-size: 12px;
  color: var(--c-text-sub);
}
.set-arrow {
  margin-left: auto;
  color: var(--c-text-light);
  font-size: 18px;
}

.version {
  text-align: center;
  color: var(--c-text-light);
  font-size: 12px;
  margin-top: 24px;
}

/* 二次确认弹窗 */
.confirm-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 20px;
}
.confirm-card {
  width: 100%;
  max-width: 320px;
  text-align: center;
  padding: 26px 22px;
}
.confirm-title {
  font-size: 19px;
  font-weight: 600;
  color: var(--c-text);
}
.confirm-text {
  font-size: 14px;
  color: var(--c-text-sub);
  margin: 10px 0 22px;
}
.confirm-btns {
  display: flex;
  gap: 12px;
}
.btn-cancel {
  flex: 1;
  padding: 11px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--c-cream);
  background: var(--c-white);
  color: var(--c-text-sub);
  cursor: pointer;
  font-size: 14px;
}
.btn-danger {
  flex: 1;
  padding: 11px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--c-primary-deep);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
</style>