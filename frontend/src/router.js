// router.js = 路由配置（v2）
// 定义"网址 → 页面"对应关系
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ScheduleView from './views/ScheduleView.vue'
import NoticeView from './views/NoticeView.vue'
import LoginView from './views/LoginView.vue'
import ProfileView from './views/ProfileView.vue'
import SettingsView from './views/SettingsView.vue'
import ToolView from './views/ToolView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { showBottom: true } },
  { path: '/schedule', name: 'schedule', component: ScheduleView, meta: { showBottom: true, back: true } },
  { path: '/notice', name: 'notice', component: NoticeView, meta: { showBottom: true, back: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { noBottom: true } },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { showBottom: true } },
  { path: '/settings', name: 'settings', component: SettingsView, meta: { noBottom: true } },
  { path: '/tool/:id', name: 'tool', component: ToolView, meta: { back: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
