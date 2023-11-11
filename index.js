
function getParams(str) {
    var queryString = str || window.location.search || '';
    var keyValPairs = [];
    var params = {};
    queryString = queryString.replace(/.*?\?/, "");

    if (queryString.length) {
        keyValPairs = queryString.split('&');
        for (pairNum in keyValPairs) {
            var key = keyValPairs[pairNum].split('=')[0];
            if (!key.length) continue;
            if (typeof params[key] === 'undefined')
                params[key] = [];
            params[key].push(keyValPairs[pairNum].split('=')[1]);
        }
    }
    return params;
}

// var url = "/duckduckgo.com/?q=id+parameter&ia=web";
const p = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

console.log(p("/post/:id"))
// let r =/^\/post\/(.+)$/;
console.log("/sec/api/12/1".match(p("/sec/api/:id")))