// server.js  （放在项目根目录 my_backend）
const app        = require('./src/app');      // ✅ 路径修正
const connectDB  = require('./src/utils/db.js');
const port       = process.env.PORT || 3000;

connectDB();                                   // 连接数据库

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
