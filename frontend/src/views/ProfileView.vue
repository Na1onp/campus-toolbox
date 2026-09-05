<script setup>
// ProfileView.vue = "我的"页（v2）
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { state, t, setUser } from '../store'

const router = useRouter()
const isLoggedIn = computed(() => !!state.user)

// 登出二次确认
const showLogoutConfirm = ref(false)
function requestLogout() { showLogoutConfirm.value = true }
function doLogout() {
  setUser(null)
  showLogoutConfirm.value = false
  router.push('/')
}
function cancelLogout() { showLogoutConfirm.value = false }
</script>

<template>
  <div class="profile-page">
    <div class="page-head">
      <h1 class="page-title">{{ t('tabProfile') }}</h1>
    </div>

    <!-- 未登录 -->
    <div v-if="!isLoggedIn" class="card guest-card">
      <div class="guest-icon">👤</div>
      <p class="guest-text">{{ t('notLoggedIn') }}</p>
      <button class="btn-primary" @click="router.push('/login')">{{ t('goLogin') }}</button>
    </div>

    <!-- 已登录 -->
    <div v-else>
      <div class="card user-card">
        <div class="avatar">👤</div>
        <div class="user-info">
          <div class="user-name">{{ state.user.phone }}</div>
          <div class="user-id">{{ t('login') }}</div>
        </div>
        <button class="logout-link" @click="requestLogout">{{ t('logout') }}</button>
      </div>
    </div>

    <!-- 设置入口（跳设置页） -->
    <div class="card settings-card">
      <div class="setting-item" @click="router.push('/settings')">
        <span class="set-icon">🎨</span>
        <div class="set-body">
          <div class="set-name">{{ t('settings') }}</div>
          <div class="set-desc">{{ t('themeColor') }} · {{ t('darkMode') }} · {{ t('language') }}</div>
        </div>
        <span class="set-arrow">›</span>
      </div>
      <div class="setting-item" @click="router.push('/schedule')">
        <span class="set-icon">📚</span>
        <div class="set-body">
          <div class="set-name">{{ t('tabSchedule') }}</div>
          <div class="set-desc">{{ t('todaySchedule') }}</div>
        </div>
        <span class="set-arrow">›</span>
      </div>
    </div>

    <p class="version">{{ t('version') }}</p>

    <!-- 登出二次确认弹窗 -->
    <div v-if="showLogoutConfirm" class="confirm-mask" @click.self="cancelLogout">
      <div class="confirm-card card">
        <h3 class="confirm-title">{{ t('confirmLogoutTitle') }}</h3>
        <p class="confirm-text">{{ t('confirmLogoutText') }}</p>
        <div class="confirm-btns">
          <button class="btn-cancel" @click="cancelLogout">{{ t('cancel') }}</button>
          <button class="btn-danger" @click="doLogout">{{ t('confirm') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-head { padding: 4px 2px 16px; }
.guest-card { text-align: center; padding: 40px 20px; }
.guest-icon { font-size: 50px; }
.guest-text { color: var(--c-text-sub); margin: 12px 0 20px; }
.user-card {
  display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
}
.avatar {
  width: 54px; height: 54px; border-radius: 50%;
  background: var(--c-cream); display: flex; align-items: center;
  justify-content: center; font-size: 26px;
}
.user-name { font-size: 18px; font-weight: 600; color: var(--c-text); }
.user-id { font-size: 13px; color: var(--c-text-sub); }
.logout-link {
  margin-left: auto; background: none; border: 1px solid #e5c3b8;
  color: #b97c6a; padding: 6px 14px; border-radius: 20px;
  font-size: 13px; cursor: pointer;
}
.settings-card { padding: 6px 16px; }
.setting-item {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 0; border-bottom: 1px solid rgba(200,180,170,0.15);
  cursor: pointer;
}
.setting-item:last-child { border-bottom: none; }
.set-icon { font-size: 22px; }
.set-name { font-weight: 500; color: var(--c-text); font-size: 15px; }
.set-desc { font-size: 12px; color: var(--c-text-sub); }
.set-arrow { margin-left: auto; color: var(--c-text-light); font-size: 18px; }
.version { text-align: center; color: var(--c-text-light); font-size: 12px; margin-top: 24px; }

/* 二次确认 */
.confirm-mask {
  position: fixed; inset: 0; background: var(--c-modal-bg);
  display: flex; align-items: center; justify-content: center;
  z-index: 300; padding: 20px;
}
.confirm-card { width: 100%; max-width: 320px; text-align: center; padding: 26px 22px; }
.confirm-title { font-size: 19px; font-weight: 600; color: var(--c-text); }
.confirm-text { font-size: 14px; color: var(--c-text-sub); margin: 10px 0 22px; }
.confirm-btns { display: flex; gap: 12px; }
.btn-cancel {
  flex: 1; padding: 11px; border-radius: var(--radius-sm);
  border: 1px solid var(--c-cream); background: var(--c-white);
  color: var(--c-text-sub); cursor: pointer; font-size: 14px;
}
.btn-danger {
  flex: 1; padding: 11px; border-radius: var(--radius-sm);
  border: none; background: var(--c-primary-deep); color: #fff;
  cursor: pointer; font-size: 14px; font-weight: 500;
}
</style>
