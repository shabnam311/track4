const router = require('express').Router();
router.get('/', (req, res) => res.json({ status: 'ok', gemini_configured: !!process.env.GEMINI_API_KEY, model: req.app.locals.MODEL, node_env: process.env.NODE_ENV || 'unknown' }));
module.exports = router;
