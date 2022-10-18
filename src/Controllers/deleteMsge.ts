"use strict";
import { OutMessage, InMessage, deleteData } from "../Models/types";
import { User, usrInbox, usrOutbox } from "../Models/models.js";
import { initializeUsrInbox, initializeUsrOutbox } from "../Models/models.js";
import { sequelize } from "../Models/models.js";
import { Sequelize, DataTypes, Model } from "sequelize";

async function deleteMsge(delData: deleteData, userId: string): Promise<void> {
  if (delData.box == "inbox") {
    let tableName: string = userId + "_inBox";
    initializeUsrInbox(tableName);

    let rec: usrInbox | null = await usrInbox.findOne({
      where: { msgId: delData.id },
    });

    if (rec) {
      await rec.destroy();

      let user: User | null = await User.findOne({
        where: { userId: userId },
      });
      if (user) {
        user.decrement({
          nRecievedM: 1,
        });
      }
    }
  } else if (delData.box == "outbox") {
    let tableName: string = userId + "_outBox";
    initializeUsrOutbox(tableName);

    let rec: usrOutbox | null = await usrOutbox.findOne({
      where: { msgId: delData.id },
    });

    if (rec) {
      await rec.destroy();
      let user: User | null = await User.findOne({
        where: { userId: userId },
      });
      if (user) {
        user.decrement({
          nSentM: 1,
        });
      }
    }
  }
}
export { deleteMsge };
