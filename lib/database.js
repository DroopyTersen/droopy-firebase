"use strict";

var firebase = require("firebase");
var Collection = require("./collection");

var connect = function connect(config) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var db = firebase.database();
    db.collections = function (name) {
        return new Collection(db, name);
    };
    try {
        if (window.Proxy) {
            var collectionsProxy = new Proxy({}, {
                get: function get(target, name) {
                    if (!(name in target)) {
                        return new Collection(db, name);
                    }
                    return target[name];
                }
            });
            collectionsProxy.collections = function (name) {
                return new Collection(db, name);
            };
            return collectionsProxy;
        }
    } catch (err) {
        console.log("droopy-firebase: Skipping Proxy. It's not supported by your browser");
    }
    return db;
};

module.exports = { connect: connect, create: connect };
//# sourceMappingURL=database.js.map