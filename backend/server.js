/**
 * 校园工具箱后端 - 服务入口
 * 
 * 这个文件是后端的"大门"，负责：
 * 1. 读取配置（端口号等）
 * 2. 启动 Express 应用
 * 3. 监听端口，让前端能访问
 */
const app = require('./src/app');

// 端口：默认 3000，可通过环境变量 PORT 覆盖（部署时用）
const PORT = process.env.PORT || 3000;

// 启动服务器并监听端口
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  🏫 校园工具箱后端已启动');
  console.log(`  📍 监听地址: http://localhost:${PORT}`);
  console.log('  ✅ 请在浏览器打开上面的地址验证');
  console.log('========================================');
});