var firebase = require("firebase");
var Collection = require("./collection");

var connect = function(config) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var db = firebase.database();
    db.collections = name => new Collection(db,name);
    try {
        if (window.Proxy) {
            let collectionsProxy = new Proxy({}, {
                get: function(target, name) {
                    if (!(name in target)) {
                        return new Collection(db, name);                    
                    }
                    return target[name];
                }
            });
            collectionsProxy.collections = name => new Collection(db,name);
            return collectionsProxy;
        }
    } catch(err) {
        console.log("droopy-firebase: Skipping Proxy. It's not supported by your browser")
    }
    return db;
}

module.exports = { connect, create: connect };