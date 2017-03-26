var Collection = function(db, name) {
    this.name = name;
    this.db = db;
}

var fetchOnce = function(refPath, db) {
    return db.ref(refPath)
        .once("value")
        .then(snapshot => snapshot.val()) 
}

Collection.prototype.on = function(eventKey, handler) {
    this.db.ref().child(this.name).on(eventKey, function(data) {
        handler(data.val() || data.key)
    });
}

Collection.prototype._getItemRef = function(key) {
    return this.db.ref(this.name + "/" + key);
}

Collection.prototype.set = function(obj) {
    if (!obj.key) throw new Error("You must pass object with 'key'")
    this._getItemRef(obj.key).set(obj)
}
Collection.prototype.add = Collection.prototype.set;

Collection.prototype.get = function(key) {
    return fetchOnce(this.name + "/" + key, this.db);
};

Collection.prototype.getItems = function() {
    return fetchOnce(this.name, this.db)
        .then(val => Object.keys(val).map(k => val[k]))
};

Collection.prototype.update = function(key, updates) {
    this._getItemRef(key).update(updates)
};

Collection.prototype.clear = function() {
    this.db.ref().child(this.name).set({});
}
Collection.prototype.empty = function() {
    this.clear();
}
module.exports = Collection;