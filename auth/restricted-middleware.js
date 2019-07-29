const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET || 'keep it secret'

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({you: 'you shall not pass'})
      } else {
        req.jwtToken = decodedToken;
        next()
      }
    })
  }else {
    res.status(401).json({you: 'you shall not pass'})
  }
};
