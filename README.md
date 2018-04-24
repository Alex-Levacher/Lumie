## 🤔 Why ??
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac augue sit amet dolor rutrum tristique non non ante. Donec eget iaculis ante. Nullam tempor vulputate ullamcorper. Sed nisl justo, dignissim a lacinia et, tempus at risus. Suspendisse vel lorem id sapien volutpat fringilla a in turpis.

✅ Maintenable<br>
✅ Scalable<br>
✅ Easy setup<br>
✅ Tests made Easy<br>

## 💾 Installation
```bash
npm install express-controllers-loader
```
## 🔩 How It Works
**Express-controllers-loader** goes through the files and folders inside your controllers directory to find what we call "routing definitions".<br>
Each controllers are defined in files, and exports they routing definitions [( example )](https://github.com/Alex-Levacher/express-controllers-loader/tree/master/example)<br><br>
By default, we use the name of the file that exports the routing definition to name the route

`/` > `controllers` > `cars.js` will create the endpoints `/users/*`<br>
`/` > `controllers` > `admin` > `rules.js` will create the `endpoints /admin/rules/*`

## ⚙️Configuration
```js
const express = require('express');
const path = require('path');
const eCtrl = require('express-controllers-loader');
const permissions = require('./permissions')

const app = express();

eCtrl.load(app, {
    preURL: 'api',
    ignore: ['*.spec', '*.action'],
    controllers_path: path.join(__dirname, 'controllers')
});

app.listen(3000, '127.0.0.1', () => {
    const { address, port } = server.address();
    console.log('Example app listening at http://%s:%s', address, port);
});
```

## Options

* **verbose** :  `bool`. Will print or not the routes name in the console.  
* **preURL** : `string`. Suffix your routes urls.
* **ignore** : `String[]`. The module will not try to find a routing definition in those files.
* **permissions** : `function`. A function that takes in parameter a level access and returns an express middleware. This is useful if you want to restrict access for some urls.<br>
With this option enabled, you will be able to set in each route configuration a field `level` that will be passed to your permission function. See below to view who to implement it.
* **directory** : `string`. directory : string. The path of your controllers directory.
