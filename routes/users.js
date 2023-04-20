const router = require('express').Router();
const {
  patchUser, getMe,
} = require('../controllers/users');
const { validatePatchUser } = require('../validation');

router.get('/me', getMe);
router.patch('/me', validatePatchUser, patchUser);

module.exports = router;
