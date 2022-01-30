import * as db from "../models/index.js";

export async function login(email, password){
    const user = await db.User.findOne({email})
    return await user.validatePassword(password)
}

export async function signup(email, firstName, lastName, password){
    const user = await db.User.create({email, firstName, lastName, password})
    return user;
}