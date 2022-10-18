"use strict";

import { User } from "../Models/models.js";
import { UserCreated } from "../Models/types";

async function getUsers(): Promise<UserCreated[]> {
  let UserSelect: UserCreated[] = [];

  await User.findAll({
    attributes: ["userId", "userName", "firstName", "lastName"],
    raw: true,
  })
    .then(
      (users) =>
        (UserSelect = users.map((user) => ({
          userId: user.userId,
          userName: user.userName,
          fullName: user.firstName + " " + user.lastName,
          checked: true,
          repeted: false,
        })))
    )
    .catch((err) => console.log(err));

  // console.log("Users_ 2 :", UserSelect);

  return UserSelect;
}

export { getUsers };
