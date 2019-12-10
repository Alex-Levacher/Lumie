
const index = (req, res) => {
    res.json({ msg: 'I am an exemple of route with the path option' });
};

module.exports = {
    path: '/',
    '/': {
        get: {
            action: index,
            level: 'public'
        }
    }
};
