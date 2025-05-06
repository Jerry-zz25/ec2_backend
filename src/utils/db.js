const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 连接成功');
  } catch (err) {
    console.error('数据库连接失败:', err.message);
    process.exit(1);
  }
};

// 关键导出语句
module.exports = connectDB;