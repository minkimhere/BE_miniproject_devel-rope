const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
  
    if (!authToken || authType !== 'Bearer') {
      res.status(401).send({
        errorMessage: '로그인 후 이용 가능한 기능입니다.',
      });
      return;
    }

    try {
        const { userId }  = jwt.verify(tokenValue, 'secret-key');
        User.findOne({ userId })
        .exec()
        .then((user) => {
            res.locals.users = user;
            next();
        });
    } catch (error) {
        res.status(400).send({
            errorMessage: '로그인 후 사용하세요 🙄',
        });
        return;
    }
}