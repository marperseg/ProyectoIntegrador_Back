"use strict";

import express, { Request, Response } from "express";
import morgan from "morgan";
import session, { Session, SessionData } from "express-session";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize, usrInbox } from "./Models/models.js";
import { createUser } from "./Controllers/createUser.js";
import { User } from "./Models/models.js";
import { getUsers } from "./Controllers/getUsers.js";
import { checkLogIn } from "./Controllers/checkLogIn.js";
import { getInbox, getOutbox } from "./Controllers/getInOutbox.js";

import {
  UserLogIn,
  userLoggedIn,
  UserCreated,
  NewUser,
  InMessage,
  OutMessage,
  deleteData,
} from "./Models/types";

import { sendNewMsge, newMsgeToOutbox } from "./Controllers/newMsge.js";
import { logInUser } from "./Controllers/logIn.js";
import { deleteMsge } from "./Controllers/deleteMsge.js";
import { markAsRead } from "./Controllers/markAsRead.js";

const app = express();

// const corsApp = cors();

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//     });

const allowedOrigins: string[] = ["http://localhost:4200"];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions))
// app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve("public")));

// Session config
const cookieAge: number = 30 * 60 * 1000; // 30 min

app.use(
  session({
    secret: "sessionSecret",
    saveUninitialized: true,
    cookie: { maxAge: cookieAge, secure: false },
    resave: false,
    name: "Session8",
  })
);

dotenv.config();

const PORT: number = 8468;

// DB connection
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed", err));

app.listen(PORT, () => console.log("Live from port: ", PORT));

// Session cookie data extension
declare module "express-session" {
  interface SessionData {
    user: userLoggedIn;
  }
}

// ------ END POINTS:

// Get for checking if a user is logged in and if the session is valid. Checks the session cookie and returns the user data.
app.get("/mps/chkUsrLogIn", (req: Request, res: Response) => {
  let session1: Partial<SessionData> = req.session;

  // console.log("session  .... chkUsrLogIn  ", req.session.id);
  // console.log("...User ", session1.user);

  checkLogIn(session1).then((LoggedIn) => res.json(LoggedIn));

  // res.status(200).json({ status: "LogIn CHECKED" }).end();
});

// Post for User Log In: recieves user and password from log-in form, validates with DB and returns the user name, checked flag and logged flag.
// checked flag indicates that the user data was properly received and checked
// logged flag indicates that the user is logged in (user name and password match the database)
app.post("/mps/logIn", (req: Request, res: Response) => {
  let usrLI: UserLogIn = {
    UserName: req.body.User,
    Password: req.body.Password,
  };
  console.log("LogIn information receivced: ", usrLI);

  logInUser(usrLI).then((usr) => {
    if (usr.logged) {
      console.log("User ", usr, "logged successfully...");
      req.session.user = usr; // Log In Session created
      console.log(
        "Log In Session created for: ",
        req.session.id,
        req.session.user
      );
      res.json(usr);
    } else {
      console.log("User information not found, sending refuse flag...");
      res.json(usr);
    }
  });
  // res.status(200)
});

// Get for user log out: destroys session and returns confirmation
app.get("/mps/logOut", (req: Request, res: Response) => {
  console.log("Logging Out...", req.session.id, req.session.user);

  if (req.session.user) {
    req.session.destroy((err) => console.log(err));
  }
  res.status(200).json({ status: "Logged out" });
});

// Put for User Sing Up: recieves user data from sing-up form, validates with DB and returns the user name, checked flag and logged flag.
// checked flag indicates that the user exsits and the password is correct
// logged flag indicates that the user is logged in
app.put("/mps/singUp", (req: Request, res: Response) => {
  let newUsr = req.body;
  // let usrCreated: UserCreated = createUser(newUsr);
  let usrCreated: Promise<UserCreated> = createUser(newUsr);

  usrCreated.then((usrCreated) => {
    console.log("UserCreated", usrCreated);
    res.json(usrCreated);
  });
});

// Get for User Inbox: recieves user Id from inbox request, searches in DB and returns the user`s inbox messages
app.get("/mps/getInbox", (req: Request, res: Response) => {
  if (req.session.user) {
    console.log("Get Inbox for session: ", req.session.id, req.session.user);
    let LoggedUser: userLoggedIn = {
      name: req.session.user.name,
      id: req.session.user.id,
      checked: req.session.user.checked,
      logged: req.session.user.logged,
    };

    getInbox(LoggedUser).then((inbox) => res.json(inbox));
    console.log("Inbox retireved correctly...");
  } else {
    res.status(200).json({ status: "No users logged..." });
  }
});

// Get for User Outbox: recieves user Id from outbox request, searches in DB and returns the user`s outbox messages
app.get("/mps/getOutbox", (req: Request, res: Response) => {
  if (req.session.user) {
    console.log("Get Outbox for session: ", req.session.id, req.session.user);
    let LoggedUser: userLoggedIn = {
      name: req.session.user.name,
      id: req.session.user.id,
      checked: req.session.user.checked,
      logged: req.session.user.logged,
    };

    getOutbox(LoggedUser).then((outbox) => res.json(outbox));
    console.log("Outbox retireved correctly...");
  } else {
    res.status(200).json({ status: "No users logged..." });
  }
});

// Post for sending a new message to one (or more) users: recieves addressees and text, stores in data base, and returns confirmation.
app.post("/mps/compose", (req: Request, res: Response) => {
  if (req.session.user) {
    console.log(req.session.user);
    console.log(
      "req.body.toNames",
      req.body.toNames,
      "req.body.to",
      req.body.to
    );

    let msg: OutMessage = {
      from: req.session.user.id,
      fromName: req.session.user.name,
      to: "",
      date: new Date(),
      body: req.body.body.message,
    };

    //store in outbox
    newMsgeToOutbox(msg, req.body.toNames, req.body.to)
      .then(() => console.log("Message Stored in Outbox..."))
      .catch((err) => console.log(err));

    // send to recievers
    sendNewMsge(msg, req.body.to)
      .then(() => {
        console.log("New Message Sent to receiver");
      })
      .catch((err) => console.log(err));
  }

  return res.status(200).json({ stauts: "Success..." });
});

// Get for sending register users as addressees: returns the list of users to whom the new message may be sent.
app.get("/mps/addresses", (req: Request, res: Response) => {
  let usersAdd: Promise<UserCreated[]> = getUsers();
  usersAdd
    .then((usersAdd) => res.json(usersAdd))
    .catch((err) => console.log(err));
});

// Post for deleting messages
app.post("/mps/deleteMsge", (req: Request, res: Response) => {
  console.log("POST DELETE");
  // console.log("deleteData",req.body, req.session.user.id )
  if (req.session.user) {
    let delData: deleteData = req.body;
    console.log("deleteData", delData.id, delData.box);
    if (req.session.user.id) {
      let userId: string = req.session.user.id;
      deleteMsge(delData, userId)
        .then(() => res.json(true))
        .catch((err) => console.log(err));
    }
  } else {
    res.status(200).json({ status: "No users logged..." });
  }
});

// Post for mark messages as Read
app.post("/mps/markAsRead", (req: Request, res: Response) => {
  if (req.session.user) {
    if (req.session.user.id) {
      let userId: string = req.session.user.id;

      markAsRead(req.body, userId)
        .then(() => res.json(true))
        .catch((err) => console.log(err));
    }
  } else {
    res.status(200).json({ status: "No users logged..." });
  }
});
