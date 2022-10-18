"use strict";
import { OutMessage, InMessage, deleteData, markAsReadData } from "../Models/types";
import { User, usrInbox, usrOutbox } from "../Models/models.js";
import { initializeUsrInbox, initializeUsrOutbox } from "../Models/models.js";
import { sequelize } from "../Models/models.js";
import { Sequelize, DataTypes, Model } from "sequelize";

async function markAsRead(
  markData: markAsReadData,
  userId: string
): Promise<void> {
  let tableName: string = userId + "_inBox";
  initializeUsrInbox(tableName);

  let rec: usrInbox | null = await usrInbox.findOne({
    where: { msgId: markData.msgId },
  });

  if (rec) {
    rec.read = markData.mark;
    await rec.save();

    let user: User | null = await User.findOne({
      where: { userId: userId },
    });
    if (user) {
      user.decrement({
        nUnreadM: 1,
      });
    }
  }
}

export { markAsRead };
