const router = require('express').Router();

router.get('/', (req, res) => {
  const plots = req.app.locals.plots;
  const { farmer_id } = req.query;
  if (farmer_id) {
    return res.json(plots.filter(p => p.farmer_id === farmer_id));
  }
  res.json(plots);
});

module.exports = router;
