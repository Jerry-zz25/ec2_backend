
// routes/alerts.js
import { Router } from 'express';
import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

const router = Router();

// 定义模型（第一次运行可用 sync() 自动建表）
const Alert = sequelize.define('alert', {
  type:      { type: DataTypes.STRING },
  message:   { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  frameUrl:  { type: DataTypes.TEXT },
}, { tableName: 'alerts', timestamps: false });

// router.get — 返回所有警报
router.get('/', async (_req, res) => {
  try {
    const list = await Alert.findAll();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询失败' });
  }
});

// router.post — 新增警报
router.post('/', async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json(alert);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: '创建失败' });
  }
});

export default router;
