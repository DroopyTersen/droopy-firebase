var firebase = require("firebase");
var Collection = require("./collection");

var connect = function(config) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var db = firebase.database();

    var collectionsProxy = new Proxy({}, {
        get: function(target, name) {
            if (!(name in target)) {
                return new Collection(db, name);                    
            }
            return target[name];
        }
    });

    //supports dynamic property names mapping to collections
    //Example: db.users or db.settings or db.posts
    return collectionsProxy;
}

module.exports = { connect, create: connect };