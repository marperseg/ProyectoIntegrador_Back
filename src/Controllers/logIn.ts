"use strict";

import bcrypt from "bcrypt";
import { User } from "../Models/models.js";
import { userLoggedIn, UserLogIn } from "../Models/types";

async function logInUser(logInData: UserLogIn): Promise<userLoggedIn> {
  console.log("logInData.UserName", logInData.UserName);
  let regUser: User | null = await User.findOne({
    where: { userName: logInData.UserName },
    attributes: ["userId", "password"],
    raw: true,
  });

  let flag1: boolean = true;
  let flag2: boolean = false;

  if (regUser) {
    flag1 = true;
    flag2 = await bcrypt.compare(logInData.Password, regUser.password);
  }

  let LoggedIn: userLoggedIn = {
    name: logInData.UserName,
    id: regUser?.userId,
    checked: flag1,
    logged: flag2,
  };

  return LoggedIn;
}

export { logInUser };
