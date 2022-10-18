"use strict";

import { User, usrInbox, usrOutbox, initializeUsrInbox, initializeUsrOutbox  } from "../Models/models.js";
import { UserCreated, InMessage, OutMessage, userLoggedIn } from "../Models/types";

async function getInbox(user: userLoggedIn): Promise<InMessage[]> {
  // Define table name
  let tableName: string = user.id + "_inBox";
  initializeUsrInbox(tableName);

  let inbox: InMessage[] = [];

  await usrInbox
    .findAll({
      // attributes: ["userId", "userName"],
      raw: true,
    })
    .then((msgs) => {
      inbox = msgs.map((msg) => ({
        msgId: msg.msgId,
        from: msg.from,
        fromName: msg.fromName,
        to: user.name,
        date: msg.date,
        body: msg.body,
        read: msg.read,
      }));

    })
    .catch((err) => console.log(err));

  // console.log("Users_ 2 :", UserSelect);

  return inbox;
}

async function getOutbox(user: userLoggedIn): Promise<OutMessage[]> {
  // Define table name
  let tableName: string = user.id + "_outBox";
  initializeUsrOutbox(tableName);

  let outbox: OutMessage[] = [];

  await usrOutbox
    .findAll({
      // attributes: ["userId", "userName"],
      raw: true,
    })
    .then((msgs) => {
      outbox = msgs.map((msg) => ({
        msgId: msg.msgId,
        from: user.id,
        fromName: user.name,
        to: msg.toNames,
        date: msg.date,
        body: msg.body,
      }));
      console.log(outbox);
    })
    .catch((err) => console.log(err));

  // console.log("Users_ 2 :", UserSelect);

  return outbox;
}

export { getInbox, getOutbox };
