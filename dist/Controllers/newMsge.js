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
function sendNewMsge(msg, toEl) {
    return _sendNewMsge.apply(this, arguments);
}
function _sendNewMsge() {
    _sendNewMsge = // post to reciever Inbox
    _asyncToGenerator(function(msg, toEl) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, tableName, rec, err;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        9,
                        10,
                        11
                    ]);
                    _iterator = toEl[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        8
                    ];
                    element = _step.value;
                    tableName = element + "_inBox";
                    // Select table
                    return [
                        4,
                        initializeUsrInbox(tableName).then(function() {
                            return console.log("USERINBOX", usrInbox.tableName);
                        })
                    ];
                case 3:
                    _state.sent();
                    // create msg
                    return [
                        4,
                        usrInbox.create({
                            // msgId: "101",
                            from: msg.from,
                            fromName: msg.fromName,
                            date: new Date(),
                            body: msg.body,
                            read: false
                        })
                    ];
                case 4:
                    _state.sent();
                    return [
                        4,
                        User.findOne({
                            where: {
                                userId: element
                            }
                        })
                    ];
                case 5:
                    rec = _state.sent();
                    if (!rec) return [
                        3,
                        7
                    ];
                    return [
                        4,
                        rec.increment({
                            nRecievedM: 1,
                            nUnreadM: 1
                        })
                    ];
                case 6:
                    _state.sent();
                    _state.label = 7;
                case 7:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 8:
                    return [
                        3,
                        11
                    ];
                case 9:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        11
                    ];
                case 10:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 11:
                    return [
                        2
                    ];
            }
        });
    });
    return _sendNewMsge.apply(this, arguments);
}
function newMsgeToOutbox(msg, toNms, toIds) {
    return _newMsgeToOutbox.apply(this, arguments);
}
function _newMsgeToOutbox() {
    _newMsgeToOutbox = // store in sender Outbox
    _asyncToGenerator(function(msg, toNms, toIds) {
        var tableName, strTo, strNames, rec;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    tableName = msg.from + "_outBox";
                    return [
                        4,
                        initializeUsrOutbox(tableName)
                    ];
                case 1:
                    _state.sent();
                    console.log("USEROUTBOX", usrOutbox.tableName);
                    if (toIds.length > 5) {
                        strTo = "send to (+5)";
                        strNames = "send to (+5)";
                    } else {
                        strTo = toIds.toString();
                        strNames = toNms.toString();
                    }
                    // store in outbox
                    return [
                        4,
                        usrOutbox.create({
                            // msgId: "101",
                            to: strTo,
                            toNames: strNames,
                            date: new Date(),
                            body: msg.body
                        })
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        User.findOne({
                            where: {
                                userId: msg.from
                            }
                        })
                    ];
                case 3:
                    rec = _state.sent();
                    if (!rec) return [
                        3,
                        5
                    ];
                    return [
                        4,
                        rec.increment({
                            nSentM: toIds.length
                        })
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return _newMsgeToOutbox.apply(this, arguments);
}
export { sendNewMsge, newMsgeToOutbox };
