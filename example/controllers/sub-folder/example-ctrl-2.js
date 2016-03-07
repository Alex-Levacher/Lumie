
var index = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({'data': "Hello World again !"});
};

module.exports = {
    '/': {
        get: {
            action: index,
            level: 'public'
        }
    }
}
