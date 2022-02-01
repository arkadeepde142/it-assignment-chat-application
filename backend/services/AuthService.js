import * as db from "../models/index.js";

export async function login(email, password) {
  const user = await db.User.findOne({ email });
  if (await user.validatePassword(password)) {
    return user._id;
  }

  return null;
}

export async function signup(email, firstName, lastName, password) {
  const user = await db.User.create({ email, firstName, lastName, password });
  return user;
}
