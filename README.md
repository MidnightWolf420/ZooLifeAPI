# ZooLifeAPI

* [Installation](#installation)
* [Common Usage](#common-usage)
	- [Get Zoos](#get-zoos)
	- [Get Habitats](#get-habitats)
	- [Get Meets](#get-meets)

## Installation
```
npm install ZooLifeAPI@MidnightWolf420 --save
```

## Common Usage

### Get Zoos

```js
zoolife.getZoos().then(async(json) => {
    console.log(json)
})
```
or
```js
zoolife.getZoos("Toronto Zoo").then(async(json) => {
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
