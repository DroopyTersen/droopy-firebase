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

## Firebase Setup
1. Go to your [Firebase Console](https://console.firebase.google.com)
2. Create a new App
3. Click Database and setup a Realtime DB instance 
    - `droopy-firebase` doesn't do anything with Auth. You can:
        - Handle auth yourself [using `firebase.auth()`](https://firebase.google.com/docs/auth/web/start)
        - Configure you Realtime DB to run in "Test Mode" (anonymously accessible)
4. Go to your Project Settings, click **Add Firebase to your Web App**, and copy out your App's config

![Project Settings](https://res.cloudinary.com/droopytersen/image/upload/q_auto:good/v1524593251/droopy-firebase/droopy-firebase0.png)
![Project Config](https://res.cloudinary.com/droopytersen/image/upload/q_auto:good/v1524593251/droopy-firebase/droopy-firebase1.png)


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