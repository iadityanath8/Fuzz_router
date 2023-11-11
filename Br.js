let pp = document.createElement('p');
pp.innerHTML = 'You have arrived at a Wrong place brothe1';
// brouter should be like a hashrouter but advance versioni of it.


// functional version of the brouter in here 
function Brouter(Obj) {
  let Browser = div;

  Browser.SyncChanges = () => {
    let strpath = window.location.pathname;
    let found = false;

    for (let i in Obj) {
      if (i === strpath) {

        // not very efficient in here
        found = true;
        Browser.innerHTML = '';
        Browser.appendChild(Obj[i]);
      }
    }

    if (!found) {
      Browser.appendChild(pp);
      console.log("are you here yet");
    }

  }

  document.querySelector("#root").appendChild(Browser);

  return Browser;
}

class Router {
  constructor() {
  }

  getParams(str) {
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


  myeventHandler(Browser_obj) {

    let r = document.querySelectorAll("a");

    for (let i of r) {
      if (i.dataset.custom_tag) {
        let attr = i.getAttribute("href");

        //console.log("Hello world from my home")
        i.addEventListener("click", (e) => {
          e.preventDefault()
          history.pushState({}, "", attr);
          Browser_obj.SyncChanges();
        })

      }
    }

  }


  Brouter_Helper(Obj) {        // returns the HTMLelement
    let Browser = document.createElement("div");

    Browser.setAttribute("id", "__thisid");

    Browser.SyncChanges = () => {

      let strpath = window.location.pathname;

      let found = false;

      for (let i in Obj) {

        const p = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        console.log();

        if (i === strpath || location.pathname.match(p(i)) !== null) {
          found = true;
          Browser.innerHTML = "";
          Browser.appendChild(Obj[i]);
        }
      }

      if (!found) {
        Browser.appendChild(pp);
      }

    }

    document.querySelector("#root").appendChild(Browser);
    return Browser

  }

  Brouter(Obj) {

    let element = this.Brouter_Helper(Obj);
    this.myeventHandler(element);
    window.addEventListener('popstate', function () {
      element.SyncChanges();
    });

  }
}


/// pages 

let page1 = document.createElement("div")
let page2 = document.createElement("div")

page1.innerHTML = '<p> This is me in here </p>'
page2.innerHTML = '<p> This is again me in here </p>'

let router = new Router();

let element = router.Brouter({
  "/sec": page1,
  "/sec/api": page2,
  "/sec/api/:id/:page": page1
})


//pastel ghost
