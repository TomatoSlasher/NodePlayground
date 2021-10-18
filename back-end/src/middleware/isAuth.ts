const jwt = require("jsonwebtoken");

module.exports = (req: any, res: any, next: any) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
  if (!decodedToken) {
    console.log("token not found");
  }
  req.userId = decodedToken.userId;
  next();
};
