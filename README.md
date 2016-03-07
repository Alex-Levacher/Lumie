## What is express-controllers-loader ?
- **Simple** - **express-controllers-loader** will help you to develop faster your controllers in order to make an API for example.
- **Automatic** - **express-controllers-loader** will read all the controllers you have created in an specific folder in order to create the routes associated.  
**Important :** The name of the route will be the name of the model controllers. Activate the verbose option in the initialization to print the route name.
- **Clear** - The definition of the controllers is really clear and this is the force of this module. All the controllers are nodes_modules.

## Installation

```bash
npm install express-controllers-loader
```

## Sample model `controllers/users.js`

This file will give you a taste of what **express-controllers-loader does**.  
The following code will create the routes :
* `get` &nbsp;&nbsp;`/users`
* `post` `/users`
* `get` &nbsp;&nbsp;`/users/:id`

```js
var getUsers = function (req, res) {
    // ...
};

var addUser = function (req, res) {
    // ...
};

var getUser = function (req, res) {
    // ...
};

module.exports = {
    '/': {
        get: getUsers,
        post: addUser
    },
    '/:id': {
        get: getUser
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
    verbose : true,
    preURL : '/v1',
    permissions: permissions,
    controllers_path : path.join(__dirname, 'controllers')
});

```

## Options

* **verbose** :  `bool`. Will print or not the routes name in the console.  
* **preURL** : `string`. Add a preURL to add a version number for example to your path.
* **permissions** : `function`. It's a middleware of the express route.
* **controllers_path** : `string`. The path of your controllers folder.  
It's required field, because without this information, the module can't read your controllers.

## Sample `permissions.js`

It's not required to use permissions if you want that all your routes become `public`

```js

function permissions(level) {
    return function (req, res, next) {
        if (level == 'public') return next();

        if (level == 'member') {
            if (req.user) return next();
            return res.status(401).end();
        }
    }
}

module.exports = permissions;

```

If you have any questions or feedbacks, feel free to contact me at : **levacher.alex@gmail.com**  
This module was developed for **[Luncher.fr](http://luncher.fr)**  
