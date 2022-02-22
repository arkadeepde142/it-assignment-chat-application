import * as db from "../models/index.js";
import jwt from "jsonwebtoken";

export async function login(email, password) {
  const user = await db.User.findOne({ email });
  if (!user) {
    throw new Error("Invalid User Error");
  }
  if (await user.validatePassword(password)) {
    const payload = {
      email: `${user.email}`,
      id: `${user._id}`,
    };
    // console.log(jwt.sign);
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    return {
      email,
      token,
    };
  } else {
    throw new Error("Wrong password error");
  }
}

export async function getIdByEmail(email){
  const user = await db.User.findOne({email});
  return user._id;
}

export async function signup(email, firstName, lastName, password) {
  try {
    const user = await db.User.create({ email, firstName, lastName, password });
    const payload = {
      email: `${user.email}`,
      id: `${user._id}`,
    };
    // console.log(sign);
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return {
      email,
      firstName,
      lastName,
      token,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Duplicate Email");
  }
}
