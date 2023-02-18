import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearer = req.headers["authorization"];

    if (bearer) {
      const token = bearer.split(" ")[1];

      return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch { return false; }
};

export const tokenAuth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return res.status(401).json({
      message: "Token invalid"
    });
  }

  const user = await User.findById(tokenDecoded.data);

  if (!user) {
    return res.status(401).json({
      message: "Token invalid"
    });
  }

  req.user = user;

  next();
};