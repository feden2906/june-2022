const router = require('express').Router();

const controller = require('../controller/auth.controller');
const userMdlwr = require('../middleware/user.middleware');
const authMdlwr = require('../middleware/auth.middleware');

router.post('/login', authMdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login);

router.post('/refresh', authMdlwr.checkRefreshToken, controller.refresh);

router.post('/logout', authMdlwr.checkAccessToken, controller.logout);

router.post('/logoutAll', authMdlwr.checkAccessToken, controller.logoutAll);

module.exports = router;
