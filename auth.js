// const jwt = require("jsonwebtoken");

// const authorization = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.send("token empty");
//   }
//   try {
//     const data = jwt.verify(token, "secret_key");
//     req.userId = data.id;
//     req.userRole = data.role;
//     return next();
//   } catch (error) {
//     return res.send(error);
//   }
// };

// module.exports = { authorization };
