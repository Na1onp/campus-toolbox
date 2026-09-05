/**
 * 校园工具箱后端 - Express 应用配置
 * 
 * 这里配置应用中间件（就是"请求处理的流水线"）：
 * - cors: 允许浏览器跨域访问（前后端分离需要）
 * - express.json: 让后端能读取前端发来的 JSON 数据
 */
const express = require('express');
const cors = require('cors');

// 创建 Express 应用实例
const app = express();

// ============ 中间件配置 ============

// 跨域：允许前端(不同端口)访问后端
app.use(cors());

// JSON 解析：前端 POST 的数据转成 JS 对象
app.use(express.json());

// ============ 测试路由 ============

// 根路径：浏览器访问 http://localhost:3000/ 时返回这段信息
app.get('/', (req, res) => {
  res.json({
    message: '🏫 校园工具箱后端已跑通！',
    status: 'ok',
    timestamp: new Date().toISOString(),
    modules: [
      'course-schedule', // 课程表
      'empty-classroom', // 空教室
      'campus-map',      // 校园地图
      'college-info',    // 学院介绍
      'dorm-info',       // 宿舍介绍
      'calendar',        // 校历
      'notice',          // 公告
      'market',          // 二手市场
      'materials',       // 学习资料
      'weather',         // 天气
      'campus-card'      // 一卡通
    ]
  });
});

// 健康检查：给部署时用的，确认服务活着
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ============ 导出 ============
module.exports = app;