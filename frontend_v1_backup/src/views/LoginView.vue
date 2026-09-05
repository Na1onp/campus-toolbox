<script setup>
// LoginView.vue = 登录 / 注册页
// 第一版：先做好界面 + 本地模拟登录(不真连后端)
//        账号系统后端逻辑稍后接(学号+密码+token)
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 切换登录/注册
const isLogin = ref(true)

const form = ref({ studentId: '', password: '', confirmPwd: '' })
const errorMsg = ref('')

function switchMode() {
  isLogin.value = !isLogin.value
  errorMsg.value = ''
}

function handleSubmit() {
  // 第一版：本地模拟，只校验非空 + 两次密码一致
  if (!form.value.studentId || !form.value.password) {
    errorMsg.value = '请填写学号和密码'
    return
  }
  if (!isLogin.value && form.value.password !== form.value.confirmPwd) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }

  // 模拟成功：跳回首页（真正的登录校验后端接好后补）
  // 这里可以加一个简单的"本地登录标记"方便测试
  localStorage.setItem('campus_login', JSON.stringify({ studentId: form.value.studentId }))
  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card card">
      <!-- 顶部 logo 区 -->
      <div class="logo-area">
        <div class="logo-badge">🏫</div>
        <h1 class="login-title">{{ isLogin ? '欢迎回来' : '创建账号' }}</h1>
        <p class="login-sub">
          {{ isLogin ? '登录校园工具箱，开始便捷校园生活' : '使用学号注册，加入校园工具箱' }}
        </p>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMsg" class="error-box">{{ errorMsg }}</div>

      <!-- 表单 -->
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>学号</label>
          <input
            v-model="form.studentId"
            class="input-field"
            type="text"
            placeholder="请输入学号"
            maxlength="11"
          />
        </div>

        <div class="form-group">
          <label>密码</label>
          <input
            v-model="form.password"
            class="input-field"
            type="password"
            placeholder="请输入密码"
          />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label>确认密码</label>
          <input
            v-model="form.confirmPwd"
            class="input-field"
            type="password"
            placeholder="请再次输入密码"
          />
        </div>

        <button type="submit" class="btn-primary login-btn">
          {{ isLogin ? '登 录' : '注 册' }}
        </button>
      </form>

      <!-- 切换模式 -->
      <div class="switch-line">
        <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
        <button class="switch-btn" @click="switchMode">
          {{ isLogin ? '立即注册' : '去登录' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 28px 24px;
}
.logo-area {
  text-align: center;
  margin-bottom: 24px;
}
.logo-badge {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--c-primary), var(--c-gold));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 14px;
  box-shadow: var(--shadow-soft);
}
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--c-text);
}
.login-sub {
  font-size: 13px;
  color: var(--c-text-sub);
  margin-top: 6px;
}

.error-box {
  background: #fdecea;
  color: #c0392b;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-size: 14px;
  color: var(--c-text-sub);
  margin-bottom: 6px;
}

.login-btn {
  width: 100%;
  margin-top: 8px;
  padding: 14px;
}

.switch-line {
  text-align: center;
  margin-top: 18px;
  font-size: 14px;
  color: var(--c-text-sub);
}
.switch-btn {
  background: none;
  border: none;
  color: var(--c-primary-deep);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>