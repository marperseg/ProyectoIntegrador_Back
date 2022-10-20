"use strict";
import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./Models/models.js";
import { createUser } from "./Controllers/createUser.js";
import { getUsers } from "./Controllers/getUsers.js";
import { checkLogIn } from "./Controllers/checkLogIn.js";
import { getInbox, getOutbox } from "./Controllers/getInOutbox.js";
import { sendNewMsge, newMsgeToOutbox } from "./Controllers/newMsge.js";
import { logInUser } from "./Controllers/logIn.js";
import { deleteMsge } from "./Controllers/deleteMsge.js";
import { markAsRead } from "./Controllers/markAsRead.js";
var app = express();
// const corsApp = cors();
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//     });
var allowedOrigins = [
    "http://localhost:4200"
];
var corsOptions = {
    origin: allowedOrigins,
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token"
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions))
// app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(express.static(path.resolve("public")));
// Session config
var cookieAge = 30 * 60 * 1000; // 30 min
app.use(session({
    secret: "sessionSecret",
    saveUninitialized: true,
    cookie: {
        maxAge: cookieAge,
        secure: false
    },
    resave: false,
    name: "Session8"
}));
dotenv.config();
var PORT = 8468;
// DB connection
sequelize.authenticate().then(function() {
    return console.log("DB connected");
}).catch(function(err) {
    return console.log("DB connection failed", err);
});
app.listen(PORT, function() {
    return console.log("Live from port: ", PORT);
});
// ------ END POINTS:
// Get for checking if a user is logged in and if the session is valid. Checks the session cookie and returns the user data.
app.get("/mps/chkUsrLogIn", function(req, res) {
    var session1 = req.session;
    // console.log("session  .... chkUsrLogIn  ", req.session.id);
    // console.log("...User ", session1.user);
    checkLogIn(session1).then(function(LoggedIn) {
        return res.json(LoggedIn);
    });
// res.status(200).json({ status: "LogIn CHECKED" }).end();
});
// Post for User Log In: recieves user and password from log-in form, validates with DB and returns the user name, checked flag and logged flag.
// checked flag indicates that the user data was properly received and checked
// logged flag indicates that the user is logged in (user name and password match the database)
app.post("/mps/logIn", function(req, res) {
    var usrLI = {
        UserName: req.body.User,
        Password: req.body.Password
    };
    console.log("LogIn information receivced: ", usrLI);
    logInUser(usrLI).then(function(usr) {
        if (usr.logged) {
            console.log("User ", usr, "logged successfully...");
            req.session.user = usr; // Log In Session created
            console.log("Log In Session created for: ", req.session.id, req.session.user);
            res.json(usr);
        } else {
            console.log("User information not found, sending refuse flag...");
            res.json(usr);
        }
    });
// res.status(200)
});
// Get for user log out: destroys session and returns confirmation
app.get("/mps/logOut", function(req, res) {
    console.log("Logging Out...", req.session.id, req.session.user);
    if (req.session.user) {
        req.session.destroy(function(err) {
            return console.log(err);
        });
    }
    res.status(200).json({
        status: "Logged out"
    });
});
// Put for User Sing Up: recieves user data from sing-up form, validates with DB and returns the user name, checked flag and logged flag.
// checked flag indicates that the user exsits and the password is correct
// logged flag indicates that the user is logged in
app.put("/mps/singUp", function(req, res) {
    var newUsr = req.body;
    // let usrCreated: UserCreated = createUser(newUsr);
    var usrCreated = createUser(newUsr);
    usrCreated.then(function(usrCreated) {
        console.log("UserCreated", usrCreated);
        res.json(usrCreated);
    });
});
// Get for User Inbox: recieves user Id from inbox request, searches in DB and returns the user`s inbox messages
app.get("/mps/getInbox", function(req, res) {
    if (req.session.user) {
        console.log("Get Inbox for session: ", req.session.id, req.session.user);
        var LoggedUser = {
            name: req.session.user.name,
            id: req.session.user.id,
            checked: req.session.user.checked,
            logged: req.session.user.logged
        };
        getInbox(LoggedUser).then(function(inbox) {
            return res.json(inbox);
        });
        console.log("Inbox retireved correctly...");
    } else {
        res.status(200).json({
            status: "No users logged..."
        });
    }
});
// Get for User Outbox: recieves user Id from outbox request, searches in DB and returns the user`s outbox messages
app.get("/mps/getOutbox", function(req, res) {
    if (req.session.user) {
        console.log("Get Outbox for session: ", req.session.id, req.session.user);
        var LoggedUser = {
            name: req.session.user.name,
            id: req.session.user.id,
            checked: req.session.user.checked,
            logged: req.session.user.logged
        };
        getOutbox(LoggedUser).then(function(outbox) {
            return res.json(outbox);
        });
        console.log("Outbox retireved correctly...");
    } else {
        res.status(200).json({
            status: "No users logged..."
        });
    }
});
// Post for sending a new message to one (or more) users: recieves addressees and text, stores in data base, and returns confirmation.
app.post("/mps/compose", function(req, res) {
    if (req.session.user) {
        console.log(req.session.user);
        console.log("req.body.toNames", req.body.toNames, "req.body.to", req.body.to);
        var msg = {
            from: req.session.user.id,
            fromName: req.session.user.name,
            to: "",
            date: new Date(),
            body: req.body.body
        };
        // console.log("BODY .... .... ... ", req.body.body)
        //store in outbox
        newMsgeToOutbox(msg, req.body.toNames, req.body.to).then(function() {
            return console.log("Message Stored in Outbox...");
        }).catch(function(err) {
            return console.log(err);
        });
        // send to recievers
        sendNewMsge(msg, req.body.to).then(function() {
            console.log("New Message Sent to receiver");
        }).catch(function(err) {
            return console.log(err);
        });
    }
    return res.status(200).json({
        stauts: "Success..."
    });
});
// Get for sending register users as addressees: returns the list of users to whom the new message may be sent.
app.get("/mps/addresses", function(req, res) {
    var usersAdd = getUsers();
    usersAdd.then(function(usersAdd) {
        return res.json(usersAdd);
    }).catch(function(err) {
        return console.log(err);
    });
});
// Post for deleting messages
app.post("/mps/deleteMsge", function(req, res) {
    console.log("POST DELETE");
    // console.log("deleteData",req.body, req.session.user.id )
    if (req.session.user) {
        var delData = req.body;
        console.log("deleteData", delData.id, delData.box);
        if (req.session.user.id) {
            var userId = req.session.user.id;
            deleteMsge(delData, userId).then(function() {
                return res.json(true);
            }).catch(function(err) {
                return console.log(err);
            });
        }
    } else {
        res.status(200).json({
            status: "No users logged..."
        });
    }
});
// Post for mark messages as Read
app.post("/mps/markAsRead", function(req, res) {
    if (req.session.user) {
        if (req.session.user.id) {
            var userId = req.session.user.id;
            markAsRead(req.body, userId).then(function() {
                return res.json(true);
            }).catch(function(err) {
                return console.log(err);
            });
        }
    } else {
        res.status(200).json({
            status: "No users logged..."
        });
    }
});
