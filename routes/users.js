const router = require('express').Router();
const {
  patchUser, getMe, logout,
} = require('../controllers/users');
const { validatePatchUser } = require('../validation');

router.get('/me', getMe);
router.patch('/me', validatePatchUser, patchUser);
router.delete('/logout', logout);

module.exports = router;
