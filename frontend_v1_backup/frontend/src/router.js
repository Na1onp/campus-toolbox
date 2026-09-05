// router.js = 路由配置
// 它定义"网址 → 页面"的对应关系，比如：
//   /         → 首页
//   /schedule → 课程表
//   /notice   → 校园公告
//   /login    → 登录
//   /profile  → 我的
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ScheduleView from './views/ScheduleView.vue'
import NoticeView from './views/NoticeView.vue'
import LoginView from './views/LoginView.vue'
import ProfileView from './views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/schedule', name: 'schedule', component: ScheduleView },
  { path: '/notice', name: 'notice', component: NoticeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/profile', name: 'profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router