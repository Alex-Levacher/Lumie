[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social)](http://bit.ly/2I9MurX)
![npm](https://img.shields.io/npm/dt/express-controllers-loader.svg)


![alt text](https://raw.githubusercontent.com/Alex-Levacher/Ecla/master/images/Ecla-logo.png)

## 🤔 WHY ??
Ecla is a lightweight module that allows you to set up a scalable controllers architecture for your nodejs project. 

✅ Maintenable<br>
✅ Scalable<br>
✅ Quick setup<br>
✅ Easily testable<br>

## 💾 INSTALLATION
```bash
npm install -S ecla
```
## 🔩 HOW IT WORKS
**Ecla** goes through the files and folders inside your controllers directory to find what we call "routing definitions".<br>
Each controllers are defined in files, who export their routing definitions [( example )](https://github.com/Alex-Levacher/Ecla/tree/master/example)<br><br>
By default, we use the name of the file that exports the routing definition to name the route

`/` > `controllers` > `cars.js` will create the endpoints `/cars/*`<br>
`/` > `controllers` > `admin` > `rules.js` will create the endpoints `/admin/rules/*`<br>
`/` > `controllers` > `users` > `users.routing.js` will create the endpoints `/users/*`

## ⚙️ CONFIGURATION
```js
const express = require('express');
const path = require('path');
const ecla = require('ecla');
const permissions = require('./permissions')

const app = express();

ecla.load(app, {
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
| **ignore** | `string[]` | `null` |The module will not try to find a routing definition in those files.|
| **controllers_path** | `string` | `path.join(__dirname, 'controllers')` |The path of your controllers folder.|
| **routing_files** | `string` | `*.routing` |How you want to name routing files.|
| **permissions** | `function` | `null` |A function that takes in parameter a **level access** and returns an [**express middleware**](https://expressjs.com/en/guide/using-middleware.html). This is useful if you want to restrict access for some urls. With this option enabled, you will be able to set in each route configuration an option level that will be passed to your permission function. See below to view who to implement it. [( example )](https://github.com/Alex-Levacher/Ecla/blob/master/example/permissions.js)|

## 🌲FILE STRUCTURE
```txt
project/
├── controllers/
│   ├── user/
│   │   ├── user.routing.js
│   │   ├── user.action.js
│   │   └── user.spec.js
│   ├── car/
│   │   ├── car.routing.js
│   │   ├── car.spec.js
|   |   ├── car-get.action.js
│   │   └── car-post.action.js
│   └── simple-ctrl.js
├── core/
│   └── permissions.js
├── app.js
└── package.json
```

![alt text](https://raw.githubusercontent.com/Alex-Levacher/Ecla/master/images/preview-run.png)


## 🎮 USAGE

### Example: project/controllers/cars.js

```js
const postCars = require('./car-post.action');
const getCars = require('./car-get.action');

module.exports = {
    path: 'awesome-cars', // rename the path of the route (optional)
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
There is **2** common way to create a controller with ECL, you can take a look [here](https://github.com/Alex-Levacher/Ecla/blob/master/example/controllers) to learn how to implement them.

- **Minimal** ([sample](https://github.com/Alex-Levacher/Ecla/blob/master/example/controllers/simple-ctrl.js)): You only create one file who takes as name, the name of the controller you want to create. Then you define inside, the routing definition and the functions. This method is recommended if you plan to have a small controller with few actions.
- **Structured** ([sample](https://github.com/Alex-Levacher/Ecla/tree/master/example/controllers/users)) : You create a new directory with the name of the controller. Inside, you create:<br>
    - `[your-controller-name].routing.js` who contains the routing definition
    - `[your-controller-name].actions.js` Who contains the action funtions of the controller.
    - `[your-controller-name].spec.js` This one is optional

If your controller is pretty heavy, with a lot of functions, we recommand to create one file per action (`create-user.action.js`, `get-user.action.js`, etc… ) ([sample](https://github.com/Alex-Levacher/Ecla/tree/master/example/controllers/cars))


## 🤙 EXAMPLES
 - [Simple Ecla project](https://github.com/Alex-Levacher/Ecla/tree/master/example)
 - [Simple controller](https://github.com/Alex-Levacher/Ecla/blob/master/example/controllers/simple-ctrl.js)
 - [Structured controller](https://github.com/Alex-Levacher/Ecla/tree/master/example/controllers/users)
 - [Scalable structured controller](https://github.com/Alex-Levacher/Ecla/tree/master/example/controllers/cars)

## 🚀 ROADMAP
Here is the next features planed, let me know if you have some ideas 

* Create a CLI to generate new controllers / projects 

## ☕️ SUPPORT
If you are struggling to setup Ecla, you found a bug or if you have some improvement ideas, feel free to [create an issue](https://github.com/Alex-Levacher/Ecla/issues)<br><br>
<a href="https://www.buymeacoffee.com/AlexLevacher" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## ⚖️ LICENSE
This software is licensed under the MIT © AlexLevacher
