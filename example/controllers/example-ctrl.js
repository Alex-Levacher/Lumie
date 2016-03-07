
var index = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({'data': "Hello World"});
};


var number = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({'data': "The number is " + req.params.value});
};

var tiny = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({'data': "Tiny World"});
};

module.exports = {
    '/': {
        get: {
            action: index,
            level: 'public'
        }
    },
    '/number/:value' : {
        get: {
            action: number,
            level: 'member'
        }
    },
    '/tiny' : {
        get: tiny
    }
}
