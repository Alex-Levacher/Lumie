[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social)](http://bit.ly/Share-Lumie-twitter)

![Lumie Logo](https://raw.githubusercontent.com/Alex-Levacher/Lumie/master/images/Lumie.png)

## 🤔 DESCRIPTION

Lumie is a lightweight module that allows you to set up a scalable controllers architecture for your nodejs project.

✅ Maintainable<br>
✅ Scalable<br>
✅ Quick setup<br>
✅ Easily testable<br>

## 💾 INSTALLATION

```bash
npm install lumie
```

## 🔩 HOW IT WORKS

**Lumie** goes through the files and folders inside your controllers directory to find what we call "routing definitions".<br>
Each controllers are defined in files, which export their routing definitions [( example )](https://github.com/Alex-Levacher/Lumie/tree/master/example)<br><br>
By default, we use the name of the file that exports the routing definition to name the route

`/` > `controllers` > `cars.js` will create the endpoints `/cars/*`<br>
`/` > `controllers` > `admin` > `rules.js` will create the endpoints `/admin/rules/*`<br>
`/` > `controllers` > `users` > `users.routing.js` will create the endpoints `/users/*`

## ⚙️ CONFIGURATION

```js
const express = require("express");
const path = require("path");
const lumie = require("lumie");

const app = express();

lumie.load(app, {
  preURL: "api",
  verbose: true,
  ignore: ["*.spec", "*.action"],
  controllers_path: path.join(__dirname, "controllers")
});

const server = app.listen(3000, "127.0.0.1", () => {
  const { address, port } = server.address();
  console.log("Example app listening at http://%s:%s", address, port);
});
```

### Options

| Name                 | type       | default value                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **verbose**          | `boolean`  | `false`                               | Will print or not the routes name in the console                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **preURL**           | `string`   | `/`                                | Prefix your route URLs                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **ignore**           | `string[]` | `null`                                | Lumie will not try to find a routing definition in those files.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **controllers_path** | `string`   | none, this option is required | The path of your controllers folder.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **routing_files**    | `string`   | `*.routing`                           | How you want to name routing files.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **permissions**      | `function` | `null`                                | A function that takes in parameter a **level access** and returns an [**express middleware**](https://expressjs.com/en/guide/using-middleware.html). This is useful if you want to restrict access for some URLs. With this option enabled, you will be able to set in each route configuration an option level that will be passed to your permission function [( example )](https://github.com/Alex-Levacher/Lumie/blob/master/example/permissions.js) |

## 🌲FILE STRUCTURE

```txt
project/
├── controllers/
│   ├── users/
│   │   ├── users.routing.js
│   │   ├── users.action.js
│   │   └── users.spec.js
│   ├── cars/
│   │   ├── cars.routing.js
│   │   ├── cars.spec.js
|   |   ├── cars-get.action.js
│   │   └── cars-post.action.js
│   └── simple-ctrl.js
├── core/
│   └── permissions.js
├── app.js
└── package.json
```

![alt text](https://raw.githubusercontent.com/Alex-Levacher/Lumie/master/images/preview-run.png)

## 🎮 USAGE

### Example: project/controllers/cars.js

```js
const postCars = require("./cars-post.action");
const getCars = require("./cars-get.action");

module.exports = {
  path: "awesome-cars", // rename the path of the route (optional)
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
            middlewares: < Array(function(req, res, next)) >// Optional
        }
    }
```

## 🌠 BEST PRACTICES

There is **2** common way to create a controller with Lumie, you can take a look [here](https://github.com/Alex-Levacher/Lumie/blob/master/example/controllers) to learn how to implement them.

* **Minimal** ([sample](https://github.com/Alex-Levacher/Lumie/blob/master/example/controllers/simple-ctrl.js)): You only create one file which takes as name, the name of the controller you want to create. Then you define the routing definition and the functions. This method is recommended if you plan to have a small controller with few actions.
* **Structured** ([sample](https://github.com/Alex-Levacher/Lumie/tree/master/example/controllers/users)): You create a new directory with the name of the controller. Inside, you create:<br>
  * `[your-controller-name].routing.js` which contains the routing definition
  * `[your-controller-name].actions.js` which contains the action functions of the controller.
  * `[your-controller-name].spec.js` This one is optional

If your controller is pretty heavy, with a lot of functions, we recommend to create one file per action (`create-user.action.js`, `get-user.action.js`, etc… ) ([sample](https://github.com/Alex-Levacher/Lumie/tree/master/example/controllers/cars))

## 🤙 EXAMPLES

* [Simple Lumie project](https://github.com/Alex-Levacher/Lumie/tree/master/example)
* [Simple controller](https://github.com/Alex-Levacher/Lumie/blob/master/example/controllers/simple-ctrl.js)
* [Structured controller](https://github.com/Alex-Levacher/Lumie/tree/master/example/controllers/users)
* [Scalable structured controller](https://github.com/Alex-Levacher/Lumie/tree/master/example/controllers/cars)

## 🚀 ROADMAP

Here are the next features planned, let me know if you have some ideas

* Create a CLI to generate new controllers / projects

## ☕️ SUPPORT
You can support the project by
* Star our GitHub repo ⭐️
* [Suggest ideas](https://github.com/Alex-Levacher/Lumie/issues) to help me promote Lumie 🌎

If you are struggling to setup Lumie, you found a bug or if you have some improvement ideas, feel free to [create an issue](https://github.com/Alex-Levacher/Lumie/issues)<br><br>


## ⚖️ LICENSE

This software is licensed under the MIT © [Alex Levacher](mailto:levacher.alex@gmail.com)
