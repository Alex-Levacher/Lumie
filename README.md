## What is express-controllers-loader ?
- **Simple** - **express-controllers-loader** will help you to develop faster your controllers and maintain a clean architechture.
- **Automatic** - **express-controllers-loader** will read all the controllers you have created in an specific folder and create the associated routes.  
**Important :** By default The name of the route will be the filename.
- **Clear** - The definition of the controllers is really clear and this is the force of this module. All the controllers are modules.

## Installation

```bash
npm install express-controllers-loader
```

## Sample model `controllers/users.js`

This file will give you a taste of what **express-controllers-loader does**.  
The following code will create the routes :
* `get` &nbsp;&nbsp;`/users`
* `post` `/users`

```js
var getUsers = function (req, res) {
    // ...
};

var addUser = function (req, res) {
    // ...
};

module.exports = {
    '/': {
        get: {
            action: getUsers,
            level: 'public'
        },
        post: {
            action: addUser,
            level: 'public'
        }
    }
}

```


## Initialize express-controllers-loader

Here you learn how to initialize the module. And all the different options

```js

var express     = require('express');
var path        = require('path');
var expressCtrl = require('express-controllers-loader');
var permissions = require('./permissions')

var app = express();

expressCtrl.load(app, {
    verbose: process.env.NODE_ENV !== 'test',
    preURL: 'api',
    ignore: ['*.spec', '*.actions'],
    permissions,
    controllers_path: path.join(__dirname, 'controllers')
});

```

## Options

* **verbose** :  `bool`. Will print or not the routes name in the console.  
* **preURL** : `string`. Add a preURL to add a version number for example to your path.
* **ignore** : `String[]`. The module will not try to find a route configuration in those files.
* **permissions** : `function`. It's a middleware of the express route.
* **controllers_path** : `string`. The path of your controllers folder.  
It's a required field, because without this information, the module can't read your controllers.

## Sample `permissions.js`


```js

const levelFcts = {
    public: (req, res, next) => next(),
    member: (req, res, next) => (req.user ? next() : res.sendStatus(401))
};

module.exports = level => (req, res, next) => levelFcts[level](req, res, next);

```
