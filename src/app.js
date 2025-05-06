const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const userRoutes = require('./routes/userRoutes');   // 路径无误

dotenv.config();

const app = express();

// ------- 全局中间件 -------
app.use(cors());          // ✅ 带 ()
app.use(express.json());

// ------- 健康检查 -------
app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));

// ------- 业务路由 -------
app.use('/api/users', userRoutes);   // ✅ userRoutes 是 Router

module.exports = app;
