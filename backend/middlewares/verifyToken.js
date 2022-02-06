import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
        algorithm: "HS256",
      });
      //   console.log(payload);
      const user = {
        email: payload.email,
        id: payload.id,
      };
      req.locals = { ...req.locals, user };
      return next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    const result = {
      message: "Authentication failed",
    };
    res.status(401).json(result);
  }
}
