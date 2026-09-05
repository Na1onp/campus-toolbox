<script setup>
// App.vue = 整个应用的"外壳"
// 它包含：顶部标题栏 + 中间页面内容区(路由出口) + 底部导航(手机上)
import { RouterView, RouterLink } from 'vue-router'

// 拿当前用户（后续接账号系统后从后端/本地取）
// 这一版先做静态占位，登录功能单独做
</script>

<template>
  <div class="app-shell">
    <!-- 顶部栏 -->
    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">🏫</span>
        <span class="brand-name">校园工具箱</span>
      </RouterLink>
      <div class="topbar-right">
        <RouterLink to="/login" class="login-link">登录</RouterLink>
      </div>
    </header>

    <!-- 页面主体：这里显示当前路由对应的页面 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 底部导航：手机上方便切换（电脑上显示为顶部tab） -->
    <nav class="bottom-nav">
      <RouterLink to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </RouterLink>
      <RouterLink to="/schedule" class="nav-item">
        <span class="nav-icon">📚</span>
        <span>课表</span>
      </RouterLink>
      <RouterLink to="/notice" class="nav-item">
        <span class="nav-icon">📰</span>
        <span>资讯</span>
      </RouterLink>
      <RouterLink to="/profile" class="nav-item">
        <span class="nav-icon">👤</span>
        <span>我的</span>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: rgba(253, 246, 241, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(232, 168, 146, 0.15);
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-icon {
  font-size: 22px;
}
.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
}
.login-link {
  font-size: 15px;
  color: var(--c-text-sub);
  background: var(--c-white);
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
  transition: all 0.2s;
}
.login-link:hover {
  background: var(--c-primary);
}

/* 主内容：上下留白，中间内容自适应 */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 16px 90px;
}

/* 底部导航（手机端为主，电脑端拉宽居中） */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(232, 168, 146, 0.15);
  padding: 8px 0;
  box-shadow: 0 -4px 20px rgba(232, 168, 146, 0.1);
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
.nav-icon {
  font-size: 20px;
}
.nav-item.router-link-active {
  color: var(--c-primary-deep);
  background: rgba(245, 201, 181, 0.2);
}
</style>