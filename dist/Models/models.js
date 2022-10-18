"use strict";
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
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
import dotenv from "dotenv";
// import { sequelize } from "./app.js";
import { Sequelize, Model, DataTypes } from "sequelize";
dotenv.config();
export var sequelize = new Sequelize("Message_App_DB", process.env.USER, process.env.PASS, {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});
var User = /*#__PURE__*/ function(Model) {
    _inherits(User, Model);
    var _super = _createSuper(User);
    function User() {
        _classCallCheck(this, User);
        return _super.apply(this, arguments);
    }
    return User;
}(Model);
User.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userName: DataTypes.STRING(128),
    firstName: DataTypes.STRING(128),
    lastName: DataTypes.STRING(128),
    password: DataTypes.STRING(128),
    country: DataTypes.STRING(40),
    city: DataTypes.STRING(40),
    nSentM: DataTypes.INTEGER,
    nRecievedM: DataTypes.INTEGER,
    nUnreadM: DataTypes.INTEGER
}, {
    tableName: "users",
    sequelize: sequelize
});
var usrInbox = /*#__PURE__*/ function(Model) {
    _inherits(usrInbox, Model);
    var _super = _createSuper(usrInbox);
    function usrInbox() {
        _classCallCheck(this, usrInbox);
        return _super.apply(this, arguments);
    }
    return usrInbox;
}(Model);
function initializeUsrInbox(tableName) {
    return _initializeUsrInbox.apply(this, arguments);
}
function _initializeUsrInbox() {
    _initializeUsrInbox = _asyncToGenerator(function(tableName) {
        return __generator(this, function(_state) {
            usrInbox.init({
                msgId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                from: DataTypes.STRING(128),
                fromName: DataTypes.STRING(128),
                date: DataTypes.DATE,
                body: DataTypes.STRING(255),
                read: DataTypes.BOOLEAN
            }, {
                tableName: tableName,
                sequelize: sequelize,
                freezeTableName: true
            });
            usrInbox.belongsTo(User, {
                foreignKey: "from"
            });
            return [
                2
            ];
        });
    });
    return _initializeUsrInbox.apply(this, arguments);
}
var usrOutbox = /*#__PURE__*/ function(Model) {
    _inherits(usrOutbox, Model);
    var _super = _createSuper(usrOutbox);
    function usrOutbox() {
        _classCallCheck(this, usrOutbox);
        return _super.apply(this, arguments);
    }
    return usrOutbox;
}(Model);
function initializeUsrOutbox(tableName) {
    return _initializeUsrOutbox.apply(this, arguments);
}
function _initializeUsrOutbox() {
    _initializeUsrOutbox = _asyncToGenerator(function(tableName) {
        return __generator(this, function(_state) {
            usrOutbox.init({
                msgId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                to: DataTypes.STRING(512),
                toNames: DataTypes.STRING(512),
                date: DataTypes.DATE,
                body: DataTypes.STRING(256)
            }, {
                tableName: tableName,
                sequelize: sequelize,
                freezeTableName: true
            });
            console.log("UserOutbox Initialized", tableName);
            // usrOutbox.belongsTo(User, {
            //   foreignKey: "to",
            // });
            // usrOutbox.sync();
            return [
                2
            ];
        });
    });
    return _initializeUsrOutbox.apply(this, arguments);
}
export { User, usrInbox, usrOutbox, initializeUsrInbox, initializeUsrOutbox };
