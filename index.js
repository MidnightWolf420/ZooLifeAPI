const axios = require('axios');

var api = "https://www.zoolife.tv/api/";

function getCookie(cname, cookies) {
    let name = cname + "=";
    let ca = cookies.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function getZooSlug(name) {
    if(!name){ name = this; }
    if(/([a-z]|[0-9]){1,}(-([a-z]|[0-9]){1,}){0,}/.test(name)&&!name.includes(" ")) {
        return name
    } else {
        var data = await getHabitats(name)
        return data[0].zoo.slug
    }
}

async function getHabitatSlug(name) {
    if(!name){ name = this; }
    if(/([a-z]|[0-9]){1,}(-([a-z]|[0-9]){1,}){0,}/.test(name)&&!name.includes(" ")) {
        try {
            var data = await getHabitats(null, null);
            data = data.filter(habitat => habitat.slug == name);
            var output = {
                animal: {
                    name: data.filter(habitat => habitat.slug == name)[0].animal,
                    slug: data.filter(habitat => habitat.slug == name)[0].slug
                },
                zoo: data.filter(habitat => habitat.slug == name)[0].zoo
            }
            return output;
        } catch(err) {
            name = name.toString()
            var data = await getHabitats()
            var output = {
                animal: {
                    name: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].animal,
                    slug: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].slug
                },
                zoo: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].zoo
            }
            return output;
        }
    } else {
        name = name.toString()
        var data = await getHabitats()
        var output = {
            animal: {
                name: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].animal,
                slug: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].slug
            },
            zoo: data.filter(habitat => habitat.animal.compare(name) >= 0.5)[0].zoo
        }
        return output;
    }
}

function compareTwoStrings(second, first) {
    if(!first){ first = this; }
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

async function getZoos(zoo) {
    return new Promise(async function (resolve, reject) {
        axios.get(`${api}/zoos/${zoo?await zoo.getZooSlug():""}`).then((res) => {
            try {
                resolve(res.data)
            } catch(err) {
                reject(err)
            }
        }).catch((err) => reject(err))
    })
}

async function getHabitats(zoo, habitat, zlsession) {
    return new Promise(async function (resolve, reject) {
        var headers = {
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "upgrade-insecure-requests": "1"
        }
        if(zlsession) headers["Cookie"] = `zl_session=${zlsession};`;
        if(zoo&&habitat) {
            var habitatSlugData = await habitat.getHabitatSlug()
            axios.get(api+`zoos/${await zoo.getZooSlug()}/habitats/${habitatSlugData.animal.slug}`, {
                headers: headers
            }).then(res => {
                return res.data
            }).then(data => {
                resolve(data.habitat)
            }).catch((err) => reject(err))
        } else if(habitat&&!zoo) {
            var habitatSlugData = await habitat.getHabitatSlug()
            //console.log(habitatSlugData)
            axios.get(api+`zoos/${habitatSlugData.zoo.slug}/habitats/${habitatSlugData.animal.slug}`, {
                headers: headers
            }).then(res => {
                return res.data
            }).then(data => {
                resolve(data.habitat)
            }).catch((err) => reject(err))
        } else if(!habitat&&zoo) {
            axios.get(api+"habitats", {
                headers: headers
            }).then(res => {
                return res.data
            }).then(data => {
                resolve(data.habitats.filter(zooData => zooData.zoo.name.compare(zoo.toString()) >= 0.5))
            }).catch((err) => reject(err))
        } else {
            axios.get(api+"habitats", {
                headers: headers
            }).then(res => {
                return res.data
            }).then(data => {
                resolve(data.habitats)
            }).catch((err) => reject(err))
        }
    })
}

async function getMeets(habitatID, zlsession) {
    return new Promise(function (resolve, reject) {
        if(habitatID) {
            var headers = {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "Referer": "https://www.zoolife.tv/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
            if(zlsession) headers["Cookie"] = `zl_session=${zlsession};`;
            axios.get(api+`habitats/${habitatID}/cards/tabs/meet`, {
                headers: headers
            }).then(res => {
                return res.data
            }).then(data => {
                resolve(data)
            }).catch((err) => reject(err))
        } else reject({error: "No Habitat ID Supplied"})
    })
}

async function getLatestVersion() {
    return new Promise((resolve, reject) => {
        axios.get(api+`release/latest`).then(res => {
            resolve(res.data.version)
        }).catch((err) => reject(err))
    })
}

async function getVersionChangelog(version) {
    return new Promise((resolve, reject) => {
        axios.get(api+`release/check?currentVersion=${version}`).then(res => {
            resolve(res.data.version)
        }).catch((err) => reject(err))
    })
}

async function login(email, password) {
    return new Promise((resolve, reject) => {
        var data = {
            email: email,
            password: password,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36'
        }
        axios.post(api + `admin/users/login`, JSON.stringify(data), {
            headers: {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            withCredentials: true
        }).then(res => {
            
            resolve({ zl_session: getCookie("zl_session", res.headers["set-cookie"][0]), data: res.data })
        }).catch((err) => reject(err))
    })
}

async function getSchedules(startTime, endTime, zlsession) {
    return new Promise((resolve, reject) => {
        var headers = {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://www.zoolife.tv/map",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
        if(zlsession) headers["Cookie"] = `zl_session=${zlsession};`;
        axios.get(api + `livetalks/schedule?startTime=${new Date(startTime).getTime()}&endTime=${new Date(endTime).getTime()}`, {
            headers: headers
        }).then(res => {
            resolve(res.data)
        }).catch((err) => reject(err))
    })
}

String.prototype.getZooSlug = getZooSlug;
String.prototype.getHabitatSlug = getHabitatSlug;
String.prototype.compare = compareTwoStrings;

module.exports = {
    getZooSlug,
    getHabitatSlug,
    compareTwoStrings,
    getZoos,
    getHabitats,
    getMeets,
    getLatestVersion,
    getVersionChangelog,
    login,
    getSchedules
};
