"use strict";

import dotenv from "dotenv";
// import { sequelize } from "./app.js";
import {
  Sequelize,
  Model,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  "Message_App_DB",
  process.env.USER as string,
  process.env.PASS as string,
  {
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: CreationOptional<string>;
  declare userName: CreationOptional<string>;
  declare firstName: CreationOptional<string>;
  declare lastName: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare country: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare nSentM: CreationOptional<number>;
  declare nRecievedM: CreationOptional<number>;
  declare nUnreadM: CreationOptional<number>;
  // declare sessionToken: CreationOptional<string>;
  //   declare createdAt: CreationOptional<Date>;
  //   declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    userId: { type: DataTypes.STRING, primaryKey: true },
    userName: DataTypes.STRING(128),
    firstName: DataTypes.STRING(128),
    lastName: DataTypes.STRING(128),
    password: DataTypes.STRING(128),
    country: DataTypes.STRING(40),
    city: DataTypes.STRING(40),
    nSentM: DataTypes.INTEGER,
    nRecievedM: DataTypes.INTEGER,
    nUnreadM: DataTypes.INTEGER,
    // sessionToken: DataTypes.STRING(128),
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

class usrInbox extends Model<
  InferAttributes<usrInbox>,
  InferCreationAttributes<usrInbox>
> {
  declare msgId: CreationOptional<number>;
  declare from: CreationOptional<string>; //sender Id
  declare fromName: CreationOptional<string>; //sender Id
  declare date: CreationOptional<Date>;
  declare body: CreationOptional<string>;
  declare read: CreationOptional<boolean>;
  //   declare createdAt: CreationOptional<Date>;
  //   declare updatedAt: CreationOptional<Date>;
}

async function initializeUsrInbox(tableName: string): Promise<void> {
  usrInbox.init(
    {
      msgId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      from: DataTypes.STRING(128), // Sender user Id foreign key
      fromName: DataTypes.STRING(128),
      date: DataTypes.DATE,
      body: DataTypes.STRING(255),
      read: DataTypes.BOOLEAN,
      // createdAt: DataTypes.DATE,
      // updatedAt: DataTypes.DATE,
    },
    {
      tableName: tableName,
      sequelize, // passing the `sequelize` instance is required
      freezeTableName: true,
    }
  );
  usrInbox.belongsTo(User, {
    foreignKey: "from",
  });

  return;
}

class usrOutbox extends Model<
  InferAttributes<usrOutbox>,
  InferCreationAttributes<usrOutbox>
> {
  declare msgId: CreationOptional<number>;
  declare to: CreationOptional<string>; //recievers Ids
  declare toNames: CreationOptional<string>; //recievers Name
  declare date: CreationOptional<Date>;
  declare body: CreationOptional<string>;
  //   declare createdAt: CreationOptional<Date>;
  //   declare updatedAt: CreationOptional<Date>;
}

async function initializeUsrOutbox(tableName: string): Promise<void> {
  usrOutbox.init(
    {
      msgId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      to: DataTypes.STRING(512), // Sender user Id foreign key
      toNames: DataTypes.STRING(512),
      date: DataTypes.DATE,
      body: DataTypes.STRING(256),
      // createdAt: DataTypes.DATE,
      // updatedAt: DataTypes.DATE,
    },
    {
      tableName: tableName,
      sequelize, // passing the `sequelize` instance is required
      freezeTableName: true,
    }
  );
  console.log("UserOutbox Initialized", tableName);

  // usrOutbox.belongsTo(User, {
  //   foreignKey: "to",
  // });

  // usrOutbox.sync();

  return;
}

export { User, usrInbox, usrOutbox, initializeUsrInbox, initializeUsrOutbox };
