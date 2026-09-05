// store.js = 全局状态（轻量版，不引入 pinia）
// 管理：主题色(3款)、深色模式、语言(简/繁/英)、登录态、i18n 文案

import { reactive } from 'vue'

// ============ 多语言文案 ============
// 结构：lang -> key -> 文本
const messages = {
  zhCN: {
    appName: '校园工具箱',
    slogan: '一所校园，N 种便捷',
    tabHome: '首页',
    tabSchedule: '课表',
    tabNotice: '资讯',
    tabProfile: '我的',
    todaySchedule: '今日课表',
    allTools: '全部工具',
    login: '登录',
    logout: '退出',
    notLoggedIn: '登录后同步你的课表与收藏',
    goLogin: '去登录',
    back: '返回',
    settings: '设置',
    themeColor: '主题颜色',
    darkMode: '深色模式',
    language: '语言 / Language',
    about: '关于',
    version: '校园工具箱 v0.2 · 开发预览版',
    // 登录页
    welcomeBack: '欢迎回来',
    loginSub: '手机号验证码登录校园工具箱',
    phone: '手机号',
    code: '验证码',
    getCode: '获取验证码',
    sendCodeSuccess: '验证码已发送（演示：1234）',
    loginBtn: '登 录',
    phonePlaceholder: '请输入手机号',
    codePlaceholder: '请输入 4 位验证码',
    phoneError: '请输入正确的手机号',
    codeError: '请输入验证码',
    // 功能占位
    comingSoon: '功能建设中',
    comingSoonSub: '这个工具正在开发中，敬请期待',
    // 设置弹层
    selectTheme: '选择主题色',
    selectLang: '选择语言',
    pinkTheme: '柔粉',
    mintTheme: '薄荷',
    blueTheme: '雾蓝',
    // 退出确认
    confirmLogoutTitle: '确认退出？',
    confirmLogoutText: '退出后需重新登录才能查看你的课表',
    cancel: '再想想',
    confirm: '确认退出',
  },
  zhTW: {
    appName: '校園工具箱',
    slogan: '一所校園，N 種便捷',
    tabHome: '首頁',
    tabSchedule: '課表',
    tabNotice: '資訊',
    tabProfile: '我的',
    todaySchedule: '今日課表',
    allTools: '全部工具',
    login: '登入',
    logout: '登出',
    notLoggedIn: '登入後同步你的課表與收藏',
    goLogin: '去登入',
    back: '返回',
    settings: '設定',
    themeColor: '主題顏色',
    darkMode: '深色模式',
    language: '語言 / Language',
    about: '關於',
    version: '校園工具箱 v0.2 · 開發預覽版',
    welcomeBack: '歡迎回來',
    loginSub: '手機號驗證碼登入校園工具箱',
    phone: '手機號',
    code: '驗證碼',
    getCode: '獲取驗證碼',
    sendCodeSuccess: '驗證碼已發送（演示：1234）',
    loginBtn: '登 入',
    phonePlaceholder: '請輸入手機號',
    codePlaceholder: '請輸入 4 位驗證碼',
    phoneError: '請輸入正確的手機號',
    codeError: '請輸入驗證碼',
    comingSoon: '功能建設中',
    comingSoonSub: '這個工具正在開發中，敬請期待',
    selectTheme: '選擇主題色',
    selectLang: '選擇語言',
    pinkTheme: '柔粉',
    mintTheme: '薄荷',
    blueTheme: '霧藍',
    confirmLogoutTitle: '確認登出？',
    confirmLogoutText: '登出後需重新登入才能查看你的課表',
    cancel: '再想想',
    confirm: '確認登出',
  },
  en: {
    appName: 'Campus Toolbox',
    slogan: 'One campus, N conveniences',
    tabHome: 'Home',
    tabSchedule: 'Schedule',
    tabNotice: 'News',
    tabProfile: 'Me',
    todaySchedule: "Today's Schedule",
    allTools: 'All Tools',
    login: 'Login',
    logout: 'Logout',
    notLoggedIn: 'Log in to sync your schedule & favorites',
    goLogin: 'Login',
    back: 'Back',
    settings: 'Settings',
    themeColor: 'Theme Color',
    darkMode: 'Dark Mode',
    language: 'Language / 语言',
    about: 'About',
    version: 'Campus Toolbox v0.2 · Preview',
    welcomeBack: 'Welcome Back',
    loginSub: 'Login with phone verification',
    phone: 'Phone',
    code: 'Code',
    getCode: 'Get Code',
    sendCodeSuccess: 'Code sent (demo: 1234)',
    loginBtn: 'Login',
    phonePlaceholder: 'Enter phone number',
    codePlaceholder: 'Enter 4-digit code',
    phoneError: 'Enter a valid phone number',
    codeError: 'Enter the code',
    comingSoon: 'Under Construction',
    comingSoonSub: 'This tool is being built, stay tuned',
    selectTheme: 'Select Theme',
    selectLang: 'Select Language',
    pinkTheme: 'Pink',
    mintTheme: 'Mint',
    blueTheme: 'Blue',
    confirmLogoutTitle: 'Confirm Logout?',
    confirmLogoutText: 'You need to log in again to view your schedule',
    cancel: 'Cancel',
    confirm: 'Logout',
  },
}

// 11 个功能定义（含图标、名字、简介、路由）
const tools = [
  { id: 'schedule', icon: '📚', key: 'toolSchedule', sub: 'toolScheduleSub', route: '/schedule' },
  { id: 'classroom', icon: '🏫', key: 'toolClassroom', sub: 'toolClassroomSub', route: '/tool/classroom' },
  { id: 'map', icon: '🗺️', key: 'toolMap', sub: 'toolMapSub', route: '/tool/map' },
  { id: 'college', icon: '🎓', key: 'toolCollege', sub: 'toolCollegeSub', route: '/tool/college' },
  { id: 'dorm', icon: '🛏️', key: 'toolDorm', sub: 'toolDormSub', route: '/tool/dorm' },
  { id: 'calendar', icon: '📅', key: 'toolCalendar', sub: 'toolCalendarSub', route: '/tool/calendar' },
  { id: 'notice', icon: '📰', key: 'toolNotice', sub: 'toolNoticeSub', route: '/notice' },
  { id: 'market', icon: '🔄', key: 'toolMarket', sub: 'toolMarketSub', route: '/tool/market' },
  { id: 'materials', icon: '📂', key: 'toolMaterials', sub: 'toolMaterialsSub', route: '/tool/materials' },
  { id: 'weather', icon: '⛅', key: 'toolWeather', sub: 'toolWeatherSub', route: '/tool/weather' },
  { id: 'card', icon: '💳', key: 'toolCard', sub: 'toolCardSub', route: '/tool/card' },
]

// 工具名的多语言补充
const toolMsgs = {
  toolSchedule: { zhCN: '课程表', zhTW: '課程表', en: 'Schedule' },
  toolScheduleSub: { zhCN: '查课上课不迷路', zhTW: '查課上課不迷路', en: 'Never miss a class' },
  toolClassroom: { zhCN: '空教室', zhTW: '空教室', en: 'Empty Rooms' },
  toolClassroomSub: { zhCN: '找间空教室自习讨论', zhTW: '找間空教室自習討論', en: 'Find a free room' },
  toolMap: { zhCN: '校园地图', zhTW: '校園地圖', en: 'Campus Map' },
  toolMapSub: { zhCN: '教学楼食堂宿舍导航', zhTW: '教學樓食堂宿舍導航', en: 'Find your way around' },
  toolCollege: { zhCN: '学院介绍', zhTW: '學院介紹', en: 'Colleges' },
  toolCollegeSub: { zhCN: '各学院专业一览', zhTW: '各學院專業一覽', en: 'Explore departments' },
  toolDorm: { zhCN: '宿舍介绍', zhTW: '宿舍介紹', en: 'Dormitories' },
  toolDormSub: { zhCN: '床位设施早知道', zhTW: '床位設施早知道', en: 'Know your dorm' },
  toolCalendar: { zhCN: '校历日期', zhTW: '校曆日期', en: 'Academic Calendar' },
  toolCalendarSub: { zhCN: '假期考试周倒计时', zhTW: '假期考試週倒數', en: 'Countdown to holidays' },
  toolNotice: { zhCN: '校园公告', zhTW: '校園公告', en: 'Campus News' },
  toolNoticeSub: { zhCN: '重要通知不错过', zhTW: '重要通知不錯過', en: 'Never miss notices' },
  toolMarket: { zhCN: '二手市场', zhTW: '二手市場', en: 'Marketplace' },
  toolMarketSub: { zhCN: '闲置书籍物品流转', zhTW: '閒置書籍物品流轉', en: 'Buy & sell used items' },
  toolMaterials: { zhCN: '学习资料', zhTW: '學習資料', en: 'Study Materials' },
  toolMaterialsSub: { zhCN: '课件笔记共享', zhTW: '課件筆記共享', en: 'Share notes & slides' },
  toolWeather: { zhCN: '天气穿衣', zhTW: '天氣穿衣', en: 'Weather' },
  toolWeatherSub: { zhCN: '今日天气穿衣建议', zhTW: '今日天氣穿衣建議', en: 'What to wear today' },
  toolCard: { zhCN: '一卡通', zhTW: '一卡通', en: 'Campus Card' },
  toolCardSub: { zhCN: '余额消费记录(演示)', zhTW: '餘額消費記錄(演示)', en: 'Card balance (demo)' },
}

// ============ 状态 ============
const state = reactive({
  theme: localStorage.getItem('ct_theme') || 'pink',   // pink / mint / blue
  dark: localStorage.getItem('ct_dark') === 'true',     // true/false
  lang: localStorage.getItem('ct_lang') || 'zhCN',      // zhCN / zhTW / en
  user: JSON.parse(localStorage.getItem('campus_login') || 'null'),
})

// 应用到 html 标签（这样 CSS 变量生效）
function applyPrefs() {
  const html = document.documentElement
  html.setAttribute('data-theme', state.theme)
  html.setAttribute('data-dark', state.dark ? 'true' : 'false')
  // 存起来
  localStorage.setItem('ct_theme', state.theme)
  localStorage.setItem('ct_dark', state.dark ? 'true' : 'false')
  localStorage.setItem('ct_lang', state.lang)
}

// ============ i18n ============
function t(key) {
  // 优先从 toolMsgs 取工具名（带语言）
  if (toolMsgs[key]) return toolMsgs[key][state.lang] || toolMsgs[key].zhCN
  // 从 messages 取
  return (messages[state.lang] && messages[state.lang][key]) ||
         messages.zhCN[key] || key
}

// 主题切换
function setTheme(theme) {
  state.theme = theme
  applyPrefs()
}
function toggleDark() {
  state.dark = !state.dark
  applyPrefs()
}
function setLang(lang) {
  state.lang = lang
  applyPrefs()
}

// 登录 / 登出
function setUser(u) {
  state.user = u
  if (u) localStorage.setItem('campus_login', JSON.stringify(u))
  else localStorage.removeItem('campus_login')
}

// 初始化应用偏好
applyPrefs()

export { state, tools, t, setTheme, toggleDark, setLang, setUser }
