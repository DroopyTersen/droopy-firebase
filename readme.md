# Droopy Firebase
Wrapper around the Firebase SDK to make working with collections simpler.  

## Install
```
npm install --save droopy-firebase
```

## Usage
Get your Firebase App's config from the Firebase Console.  Then connect to the db with droopy-firebase.
``` javascript
var config = { "..." : "...config from firebase portal..." }
var db = require("droopy-firebase").connect(config);

// Add an item to the collection. You MUST specify a 'key'
await db.movies.add({ key: 123, title: "Gladiator" })

// Update an item
await db.movies.update(123, { rating: 8.2 });

// Get the item by key 
let movie = await db.movies.get(123)
console.log(movie);

// Get all items in a collection
let allMovies = await db.movies.getItems()
console.log(movies);

let actors = await db.actors.getItems();
console.log(actors):
```

## Dynamic Collections
Even if a collection doesn't exist, you can still reference it on your `db` object (thanks to a javascript proxy)
``` javascript
// Create a movies collection if it doesn't exist, then add an item to it
await db.movies.add({ key: 123, title: "Gladiator" })
```
### Get all items in a collection
Let's say we had a collecton of blog posts in the db
``` javascript
let posts = await db.posts.getItems();
```

### Get Item by key
``` javascript
let movie = await db.movies.get(123)
```

### Update Item
Use `update` if the item exists already an you just want to change a couple property or add a new property
``` javascript
await db.movies.add({ key: 567, title: "A Lot Like Love" })
await db.movies.update(567, { rating: 7.3 })
```

### Remove Item
``` javascript
db.movies.remove(123);
```

## Realtime Events
Event types are `add`, `update`, `remove`.

Subscribe to `movies` collection changes
``` javascript
db.movies.on("add", (newMovie) => {
    console.log(newMovie);
})

db.movies.on("update", (updatedMovie) => {
    console.log(updatedMovie);
})

db.movies.on("remove", (deletedMovie) => {
    console.log(deletedMovie);
})
```

### Empty/remove a collection
Get rid of all items in the `posts` collection
``` javascript
db.posts.clear();
```