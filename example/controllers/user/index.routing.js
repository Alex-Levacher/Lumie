
const index = function (req, res) {
    res.json({ data: 'I am a root' });
};

module.exports = {
    '/': {
        get: {
            action: index,
            level: 'public'
        }
    },
    rename: ''
};
