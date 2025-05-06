const express = require('express');
const router  = express.Router();        // ✅ 正确来源

router.get('/', (_req, res) => res.json({ msg: 'Users OK' }));
module.exports = router;                 // ✅ 只导出 router
