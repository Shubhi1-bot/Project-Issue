var express = require('express');
var router = express.Router();
var IssueCtrl = require('../Controllers/IssueCtrl');

router.post('/issue', IssueCtrl.createRecord);
router.get('/issue', IssueCtrl.getRecord);
router.get('/issue/:id', IssueCtrl.getRecordById)
router.put('/issue/:id', IssueCtrl.putRecord);
router.delete('/issue/:id', IssueCtrl.deleteRecord);
module.exports = router;