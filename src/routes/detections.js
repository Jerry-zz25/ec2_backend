// routes/detections.js
import { Router } from 'express';
import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

const router = Router();

// 定义模型
const Detection = sequelize.define('detection', {
  class:      { type: DataTypes.STRING },
  confidence: { type: DataTypes.FLOAT },
  x:          { type: DataTypes.INTEGER },
  y:          { type: DataTypes.INTEGER },
  w:          { type: DataTypes.INTEGER },
  h:          { type: DataTypes.INTEGER },
  detectedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'detections', timestamps: false });

// POST /api/detections — 批量入库
router.post('/', async (req, res) => {
  const { detections } = req.body;
  if (!Array.isArray(detections)) {
    return res.status(400).json({ error: '请求体格式错误' });
  }
  try {
    const rows = detections.map(d => ({
      class:      d.class,
      confidence: d.confidence,
      x:          d.bbox[0],
      y:          d.bbox[1],
      w:          d.bbox[2],
      h:          d.bbox[3],
    }));
    await Detection.bulkCreate(rows);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '写入失败' });
  }
});

export default router;
