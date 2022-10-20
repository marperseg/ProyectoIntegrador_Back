"use strict";

import { User, usrInbox, usrOutbox } from "../Models/models.js";
import { sequelize } from "../Models/models.js";
import { Sequelize, DataTypes, Model } from "sequelize";
import { initializeUsrInbox, initializeUsrOutbox } from "../Models/models.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import {
  userLoggedIn,
  UserCreated,
  NewUser,
  InMessage,
  OutMessage,
} from "../Models/types";

// This function creates a new user after checking if the userName is unique.
async function createUser(newUsr: NewUser): Promise<UserCreated> {
  // function createUser(newUsr: NewUser): UserCreated {

  let userCrtd: UserCreated = {
    // Default value for user repeted
    userName: newUsr.userName,
    fullName: "",
    userId: "",
    checked: true,
    repeted: true,
  };

  let userRepetead: boolean = false;
  let userNames: string[] = [];

  await User.findAll({
    attributes: ["userName"],
    raw: true,
  }).then((users) => {
    console.log("USERS SING UP", users);
    userNames = users.map((user) => user.userName);
  });

  if (userNames.includes(newUsr.userName)) userRepetead = true; //The user name is already registered.

  console.log("USER REPETED", userRepetead)
  if (!userRepetead) {
    newUsr.userId = uuidv4();
    console.log(newUsr.userId);

    // Hash password before storing
    let hashPass: string = await hashPassword(newUsr.password);

    await User.create({
      userId: newUsr.userId,
      userName: newUsr.userName,
      firstName: newUsr.firstName,
      lastName: newUsr.lastName,
      password: hashPass,
      country: newUsr.country,
      city: newUsr.city,
      nSentM: 0,
      nRecievedM: 0,
      nUnreadM: 0,
    });

    User.sync();

    createInbox(newUsr.userId);
    createOutbox(newUsr.userId);
    // console.log(User.tableName);
    // console.log(usrInbox.tableName);

    userCrtd = {
      userName: newUsr.userName,
      fullName: newUsr.firstName + " " + newUsr.lastName,
      userId: newUsr.userId,
      checked: true,
      repeted: false,
    };
  }

  return userCrtd;
}

function createInbox(usrId: string): void {
  let tableName: string = usrId + "_inBox";

  initializeUsrInbox(tableName);
  usrInbox.sync();
}

function createOutbox(usrId: string): void {
  let tableName: string = usrId + "_outBox";

  initializeUsrOutbox(tableName);
  usrOutbox.sync();
}

async function hashPassword(basePass: string): Promise<string> {
  const saltRounds: number = 10;

  //password hashing with bcrypt
  let hashPass = await bcrypt.hash(basePass, saltRounds);

  // let hashPass = hash;
  return hashPass;
}

export { createUser, hashPassword };
