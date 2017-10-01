var Collection = function(db, name) {
    this.name = name;
    this.db = db;
}

var fetchOnce = function(refPath, db) {
    return db.ref(refPath)
        .once("value")
        .then(snapshot => snapshot.val()) 
}
Collection.prototype._onAdd = function(handler) {
    this.db.ref()
        .child(this.name)
        .orderByChild('_timestamp')
        .startAt(Date.now())
        .on('child_added', (snapshot) => handler(snapshot.val()))
}

Collection.prototype.on = function(eventKey, handler) {
    let ref = this.db.ref().child(this.name);
    if (eventKey === "add") {
        this._onAdd(handler);
    } else if (eventKey === "update") {
        ref.on("child_changed", snapshot => handler(snapshot.val()))
    } else if (eventKey === "remove") {
        ref.on("child_removed", snapshot => handler(snapshot.val()))
    } else {
        ref.on(eventKey, function(data) {
            handler(data.val() || data.key)
        });
    }
}

Collection.prototype._getItemRef = function(key) {
    return this.db.ref(this.name + "/" + key);
}

Collection.prototype.set = function(obj) {
    if (!obj.key) throw new Error("You must pass object with 'key'")
    obj._timestamp = Date.now()
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

Collection.prototype.remove = function(key) {
    this._getItemRef(key).remove();
};

Collection.prototype.clear = function() {
    this.db.ref().child(this.name).set({});
};

Collection.prototype.empty = function() {
    this.clear();
};
module.exports = Collection;