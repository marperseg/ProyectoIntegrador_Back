"use strict";
import { OutMessage, InMessage } from "../Models/types";
import { User, usrInbox, usrOutbox } from "../Models/models.js";
import { initializeUsrInbox, initializeUsrOutbox } from "../Models/models.js";
import { sequelize } from "../Models/models.js";
import { Sequelize, DataTypes, Model } from "sequelize";

// post to reciever Inbox
async function sendNewMsge(msg: OutMessage, toEl: string[]): Promise<void> {
  for (const element of toEl) {
    let tableName: string = element + "_inBox";

    // Select table
    await initializeUsrInbox(tableName).then(() =>
      console.log("USERINBOX", usrInbox.tableName)
    );
    // create msg
    await usrInbox.create({
      // msgId: "101",
      from: msg.from, //sender Id
      fromName: msg.fromName,
      date: new Date(),
      body: msg.body,
      read: false,
    });

    //Update counters
    let rec: User | null = await User.findOne({ where: { userId: element } });

    if (rec) {
      await rec.increment({
        nRecievedM: 1,
        nUnreadM: 1,
      });
    }
  }

  return;
}


// store in sender Outbox
async function newMsgeToOutbox(
  msg: OutMessage,
  toNms: string[],
  toIds: string[]
): Promise<void> {
  // console.log("MESSAGE", msg);

  let tableName = msg.from + "_outBox";

  await initializeUsrOutbox(tableName);
  console.log("USEROUTBOX", usrOutbox.tableName);

  let strTo, strNames: string;

  if (toIds.length > 5) {
    strTo = "send to (+5)";
    strNames = "send to (+5)";
  } else {
    strTo = toIds.toString();
    strNames = toNms.toString();
  }

  // store in outbox
  await usrOutbox.create({
    // msgId: "101",
    to: strTo, //recievers Ids
    toNames: strNames, //recievers Names
    date: new Date(),
    body: msg.body,
  });

  //Update counters
  let rec: User | null = await User.findOne({ where: { userId: msg.from } });

  if (rec) {
    await rec.increment({
      nSentM: toIds.length,
    });
  }

  return;
}

export { sendNewMsge, newMsgeToOutbox };
