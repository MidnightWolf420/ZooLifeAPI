# ZooLifeAPI

* [Installation](#installation)
* [Usage](#usage)

## Installation
```
npm install ZooLifeAPI@MidnightWolf420 --save
```

## Usage
```js
const zoolife = require('ZooLifeAPI@MidnightWolf420');

zoolife.getZoos().then(async(json) => {
    var zoo = json.zoos.filter(zoo => zoo.name.compare("Toronto Zoo") >= 0.7)[0]
    var zooSlug = await zoo.name.getZooSlug();
    var habitats = await zoolife.getHabitats(null, "Amur Leopards", 'zl_session')
    console.log(habitats)
    var meet = await zoolife.getMeets(habitats._id, 'zl_session')
    console.log(meet)
})
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