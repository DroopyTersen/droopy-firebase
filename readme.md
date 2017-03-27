# Droopy Firebase
Wrapper around the Firebase SDK to make working with collections simpler.  

## Install
```
npm install --save droopy-firebase
```

## Usage
Create a new firebase app and copy the config.  Then create a new droopy-firebase db.
``` javascript
var config = { "..." : "...config from firebase portal..." }
var db = require("droopy-firebase").create(config);
// Add an item to the collection
db.movies.add({ key: 123, title: "Gladiator" })

// Get the item by key
db.movies.get(123).then(movie => {
    console.log(movie);
})


// Get all items in the movies collection
db.movies.getItems().then(movies => {
    console.log(movies);
})
db.actors.getItems().then(actors => {
    console.log(actors):
})
```

## Dynamic Collections
Even if a collection doesn't exist, you can still reference it on your `db` object (thanks to a javascript proxy)
``` javascript
// There doesn't even have to be "movies" out there yet
db.movies.add({ key: 123, title: "Gladiator" })
```
### Get all items in a collection
Let's say we had a collecton of blog posts in the db
``` javascript
db.posts.getItems().then(posts => {
    console.log(posts);
})
```

### Get Item by key
``` javascript
db.movies.get(123).then(movie => {
    console.log(movie);
})
```

### Update Item
Use `update` if the item exists already an you just want to change a couple property or add a new property
``` javascript
db.movies.add({ key: 567, title: "A Lot Like Love" })
db.movies.update(567, { rating: 7.3 })
```
## Realtime Events
Event types are `child_added`, `child_changed`, `child_removed`, and `child_moved`.

Subscribe to all updates to `movies` collection
``` javascript
db.movies.on("child_changed", (data) => {
    console.log(data);
})
```

### Empty/remove a collection
Get rid of all items in the `posts` collection
``` javascript
db.posts.clear();
```