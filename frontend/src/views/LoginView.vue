<script setup>
// LoginView.vue = 登录页（v2 手机号 + 验证码）
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { t, setUser } from '../store'

const router = useRouter()
const form = ref({ phone: '', code: '' })
const errorMsg = ref('')
const sent = ref(false)   // 是否已点获取验证码
const countdown = ref(0)  // 倒计时
const isLogin = ref(true) // true登录 / false注册(仅演示，都走手机号)

function sendCode() {
  if (!/^1\d{10}$/.test(form.value.phone)) {
    errorMsg.value = t('phoneError')
    return
  }
  sent.value = true
  errorMsg.value = ''
  // 演示：倒计时 60 秒
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
  // 真实环境这里会调后端发短信；演示我们提示一下
  alert(t('sendCodeSuccess')) // 演示：实际是后端发短信
}

function handleSubmit() {
  if (!/^1\d{10}$/.test(form.value.phone)) { errorMsg.value = t('phoneError'); return }
  if (!form.value.code) { errorMsg.value = t('codeError'); return }
  // 演示：任何 4 位码都可登录
  setUser({ phone: form.value.phone })
  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <!-- 自带返回栏（全屏页） -->
    <div class="login-back">
      <button class="back-btn" @click="$router.back()">
        <span class="back-arrow">‹</span>
      </button>
    </div>

    <div class="login-card card">
      <div class="logo-area">
        <div class="logo-badge">🏫</div>
        <h1 class="login-title">{{ t('welcomeBack') }}</h1>
        <p class="login-sub">{{ t('loginSub') }}</p>
      </div>

      <div v-if="errorMsg" class="error-box">{{ errorMsg }}</div>

      <form @submit.prevent="handleSubmit">
        <!-- 手机号 -->
        <div class="form-group">
          <label>{{ t('phone') }}</label>
          <input
            v-model="form.phone"
            class="input-field"
            type="tel"
            :placeholder="t('phonePlaceholder')"
            maxlength="11"
          />
        </div>

        <!-- 验证码 + 获取按钮 -->
        <div class="form-group">
          <label>{{ t('code') }}</label>
          <div class="code-row">
            <input
              v-model="form.code"
              class="input-field code-input"
              type="text"
              :placeholder="t('codePlaceholder')"
              maxlength="4"
            />
            <button
              type="button"
              class="get-code-btn"
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : t('getCode') }}
            </button>
          </div>
        </div>

        <button type="submit" class="btn-primary login-btn">
          {{ t('loginBtn') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.login-back {
  position: absolute;
  top: 12px; left: 12px;
}
.back-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; }
.back-arrow { font-size: 34px; color: var(--c-text); line-height: 1; font-weight: 300; }
.login-card { width: 100%; max-width: 400px; padding: 28px 24px; }
.logo-area { text-align: center; margin-bottom: 24px; }
.logo-badge {
  width: 60px; height: 60px; border-radius: 20px;
  background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; margin: 0 auto 14px; box-shadow: var(--shadow-soft);
}
.login-title { font-size: 24px; font-weight: 600; color: var(--c-text); }
.login-sub { font-size: 13px; color: var(--c-text-sub); margin-top: 6px; }
.error-box {
  background: var(--c-error-bg); color: var(--c-error-text);
  font-size: 13px; padding: 10px 14px; border-radius: var(--radius-sm);
  margin-bottom: 16px;
}
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 14px; color: var(--c-text-sub); margin-bottom: 6px; }
.code-row { display: flex; gap: 10px; }
.code-input { flex: 1; }
.get-code-btn {
  width: 110px; flex-shrink: 0;
  background: var(--c-primary); color: var(--c-text);
  border: none; border-radius: var(--radius-sm);
  font-size: 14px; cursor: pointer; transition: all 0.2s;
}
.get-code-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.login-btn { width: 100%; margin-top: 8px; padding: 14px; }
</style>
