/**
 * 校园工具箱后端 - SQLite 数据库连接
 * 
 * better-sqlite3 是一个"同步"的 SQLite 库，简单直接。
 * 数据库文件放在 backend/data/campus.db（这个目录已被 .gitignore 排除，不会提交到 GitHub）
 */
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// 确保 data 目录存在
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 数据库文件路径
const dbFile = path.join(dataDir, 'campus.db');

// 打开数据库（如果文件不存在会自动创建）
const db = new Database(dbFile);

// 开启外键约束（以后建多张表互相引用时有用）
db.pragma('journal_mode = WAL');

// 导出数据库实例
module.exports = db;