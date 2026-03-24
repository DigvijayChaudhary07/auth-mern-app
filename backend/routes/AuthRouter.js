const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login } = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;