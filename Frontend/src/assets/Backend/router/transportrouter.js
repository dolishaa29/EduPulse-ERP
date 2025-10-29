const express = require('express');
const router = express.Router();
const { transportcreate, transportview, transport, transportupdate, transportdelete } = require('../controller/transportcontroller');
router.post('/transportcreate', transportcreate);
router.get('/transportview', transportview);
router.get('/transport/:id', transport);
router.put('/transportupdate/:id', transportupdate);
router.delete('/transportdelete/:id', transportdelete);

module.exports = router;
