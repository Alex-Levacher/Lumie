## 🤔 WHY ??
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac augue sit amet dolor rutrum tristique non non ante. Donec eget iaculis ante. Nullam tempor vulputate ullamcorper. Sed nisl justo, dignissim a lacinia et, tempus at risus. Suspendisse vel lorem id sapien volutpat fringilla a in turpis.

✅ Maintenable<br>
✅ Scalable<br>
✅ Easy setup<br>
✅ Tests made Easy<br>

## 💾 INSTALLATION
```bash
npm install express-controllers-loader
```
## 🔩 HOW IT WORKS
**Express-controllers-loader** goes through the files and folders inside your controllers directory to find what we call "routing definitions".<br>
Each controllers are defined in files, and exports they routing definitions [( example )](https://github.com/Alex-Levacher/express-controllers-loader/tree/master/example)<br><br>
By default, we use the name of the file that exports the routing definition to name the route

`/` > `controllers` > `cars.js` will create the endpoints `/users/*`<br>
`/` > `controllers` > `admin` > `rules.js` will create the `endpoints /admin/rules/*`

## ⚙️ CONFIGURATION
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

### Options

|Name|type|default value|Description|
|--  |--  |--           |--         |
| **verbose** | `boolean` | `true` |Will print or not the routes name in the console|
| **preURL** | `string` | `null` |Suffix your routes urls|
| **ignore** | `string[]` | `true` |The module will not try to find a routing definition in those files.|
| **controllers_path** | `string` | `path.join(__dirname, 'controllers')` |The path of your controllers folder.|
| **permissions** | `function` | `null` |A function that takes in parameter a **level access** and returns an [**express middleware**](https://expressjs.com/en/guide/using-middleware.html). This is useful if you want to restrict access for some urls. With this option enabled, you will be able to set in each route configuration an option level that will be passed to your permission function. See below to view who to implement it. [( example )](https://github.com/Alex-Levacher/express-controllers-loader/blob/master/example/permissions.js)|


## 🎮 USAGE

```js

/**
* user.routing.js
*/

const postCars = require('./createCar.actions');
const getCars = require('./getCars.actions');

module.exports = {
    '/': {
        post: {
            middlewares: postCars.middlewares,
            action: postCars.action,
            level: 'public'
        },
        get: {
            action: getCars.getAll,
            level: 'public'
        }
    },
    '/:id': {
        get: {
            action: getCars.getOne,
            level: 'public'
        }
    }
};
```

```
'/<name of your route>': {
        < get | put | delete | post >: {
            action: < function(req, res) >,
            level: < parameters of you permission function >, // Optional
            middlewares: < Array(function(req, res, next)) > // Optional
        }
    }
```

## 🌠 BEST PRACTICES
It is recommended to separate your routing definition file from your action functions as we see in the usage above.


## 🤙 EXAMPLES

## 🚀 ROADMAP
Here is the next features planed, let me know if you have some ideas 

* Create a CLI to generate new controllers / projects 

## ☕️ SUPPORT

## ⚖️ LICENSE
This software is licensed under the MIT © AlexLevacher
