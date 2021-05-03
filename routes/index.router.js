const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { pageTitle: "Express-CRUD", youAreUsingPug: true });
})
module.exports = router;