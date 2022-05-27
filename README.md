# ZooLifeAPI

* [Installation](#installation)
* [Common Usage](#common-usage)
    - [Login](#login)
    - [Get Latest Version](#get-latest-version)
    - [Get Version Changelog](#get-version-changelog)
	- [Get Zoos](#get-zoos)
	- [Get Habitats](#get-habitats)
	- [Get Meets](#get-meets)

## Installation
```
npm install zoolife_api --save
```

## Common Usage

```js
const { login, getZooSlug, getHabitatSlug, compareTwoStrings, getZoos, getHabitats, getMeets, getLatestVersion, getVersionChangeLog, getSchedules } = require('zoolife_api');
```

### Login

```js
login("email", "password").then(res => {
    console.log(`Logged In As ${res.data.user.username}`);
    //zlsession is res.zl_session
    //user data is res.data
})
```

### Get Latest Version

```js
getLatestVersion().then(version => {
    console.log(version);
})
```

### Get Version Changelog

```js
getVersionChangelog(version).then(data => {
    console.log(data);
})
```

### Get Schedules

```js
getSchedules("05/27/2022 12:00:00", "05/28/2022 9:00:00", zlsession).then(data => {
    console.log(data);
})
```

### Get Zoos

```js
getZoos().then((data) => {
    console.log(data);
})
```
or
```js
getZoos("Toronto Zoo").then((data) => {
    console.log(data);
})
```

### Get Habitats

```js
var habitats = await getHabitats(null, "Amur Leopards", zl_session);
console.log(habitats);
```
or
```js
var habitats = await getHabitats(null, null, zl_session);
console.log(habitats);
```
or
```js
var habitats = await getHabitats("Toronto Zoo", null, zl_session);
console.log(habitats);
```

### Get Meets

```js
var habitats = await getHabitats(null, "Amur Leopards", zl_session);
var meets = await getMeets(habitats._id, zl_session);
console.log(meets);
```
