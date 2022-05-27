# ZooLifeAPI

* [Installation](#installation)
* [Common Usage](#common-usage)
	- [Get Zoos](#get-zoos)
	- [Get Habitats](#get-habitats)
	- [Get Meets](#get-meets)

## Installation
```
npm install MidnightWolf420/ZooLifeAPI --save
```

## Common Usage

```js
const { getZooSlug, getHabitatSlug, compareTwoStrings, getZoos, getHabitats, getMeets } = require('zoolife_api')
```

### Get Zoos

```js
getZoos().then(async(json) => {
    console.log(json)
})
```
or
```js
getZoos("Toronto Zoo").then(async(json) => {
    console.log(json)
})
```

### Get Habitats

```js
var habitats = await getHabitats(null, "Amur Leopards", zl_session)
console.log(habitats)
```
or
```js
var habitats = await getHabitats(null, null, zl_session)
console.log(habitats)
```
or
```js
var habitats = await getHabitats("Toronto Zoo", null, zl_session)
console.log(habitats)
```

### Get Meets

```js
var habitats = await getHabitats(null, "Amur Leopards", zl_session)
var meets = await getMeets(habitats._id, zl_session)
console.log(meets)
```
