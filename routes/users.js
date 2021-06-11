const router = require('express').Router();

const { validateChangeUserInfo } = require('../middlewares/validation');

const { getUserInfo, changeUserInfo } = require('../controllers/users');

// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);

// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', validateChangeUserInfo, changeUserInfo);

module.exports = router;
