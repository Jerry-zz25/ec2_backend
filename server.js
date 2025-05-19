// server.js (项目入口)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// 加载 .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 全局中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'  // 需要时可设为你前端域名
}));
app.use(express.json());

// 数据库连接示例（可改为你自己封装的 db.js）
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

// 健康检查
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 挂载业务路由
import alertsRouter from './routes/alerts.js';
import detectionsRouter from './routes/detections.js';

app.use('/api/alerts', alertsRouter);
app.use('/api/detections', detectionsRouter);

// 启动前测试数据库连通性（可选）
sequelize.authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB connect failed:', err));

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
});
