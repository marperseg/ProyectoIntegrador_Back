"use strict";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var __generator = this && this.__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
import { User, usrInbox, usrOutbox } from "../Models/models.js";
import { initializeUsrInbox, initializeUsrOutbox } from "../Models/models.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
function createUser(newUsr) {
    return _createUser.apply(this, arguments);
}
function _createUser() {
    _createUser = // This function creates a new user after checking if the userName is unique.
    _asyncToGenerator(function(newUsr) {
        var userCrtd, userRepetead, userNames, hashPass;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    userCrtd = {
                        // Default value for user repeted
                        userName: newUsr.userName,
                        fullName: "",
                        userId: "",
                        checked: true,
                        repeted: true
                    };
                    userRepetead = false;
                    userNames = [];
                    return [
                        4,
                        User.findAll({
                            attributes: [
                                "userName"
                            ],
                            raw: true
                        }).then(function(users) {
                            console.log("USERS SING UP", users);
                            userNames = users.map(function(user) {
                                return user.userName;
                            });
                        })
                    ];
                case 1:
                    _state.sent();
                    if (userNames.includes(newUsr.userName)) userRepetead = true; //The user name is already registered.
                    console.log("USER REPETED", userRepetead);
                    if (!!userRepetead) return [
                        3,
                        4
                    ];
                    newUsr.userId = uuidv4();
                    console.log(newUsr.userId);
                    return [
                        4,
                        hashPassword(newUsr.password)
                    ];
                case 2:
                    hashPass = _state.sent();
                    return [
                        4,
                        User.create({
                            userId: newUsr.userId,
                            userName: newUsr.userName,
                            firstName: newUsr.firstName,
                            lastName: newUsr.lastName,
                            password: hashPass,
                            country: newUsr.country,
                            city: newUsr.city,
                            nSentM: 0,
                            nRecievedM: 0,
                            nUnreadM: 0
                        })
                    ];
                case 3:
                    _state.sent();
                    createInbox(newUsr.userId);
                    createOutbox(newUsr.userId);
                    // console.log(User.tableName);
                    // console.log(usrInbox.tableName);
                    userCrtd = {
                        userName: newUsr.userName,
                        fullName: newUsr.firstName + " " + newUsr.lastName,
                        userId: newUsr.userId,
                        checked: true,
                        repeted: false
                    };
                    _state.label = 4;
                case 4:
                    return [
                        2,
                        userCrtd
                    ];
            }
        });
    });
    return _createUser.apply(this, arguments);
}
function createInbox(usrId) {
    var tableName = usrId + "_inBox";
    initializeUsrInbox(tableName);
    usrInbox.sync();
}
function createOutbox(usrId) {
    var tableName = usrId + "_outBox";
    initializeUsrOutbox(tableName);
    usrOutbox.sync();
}
function hashPassword(basePass) {
    return _hashPassword.apply(this, arguments);
}
function _hashPassword() {
    _hashPassword = _asyncToGenerator(function(basePass) {
        var saltRounds, hashPass;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    saltRounds = 10;
                    return [
                        4,
                        bcrypt.hash(basePass, saltRounds)
                    ];
                case 1:
                    hashPass = _state.sent();
                    // let hashPass = hash;
                    return [
                        2,
                        hashPass
                    ];
            }
        });
    });
    return _hashPassword.apply(this, arguments);
}
export { createUser, hashPassword };
