
const index = (req, res) => {
    res.json({ msg: 'I am a minimal implementation' });
};

const number = (req, res) => {
    res.json({ msg: `The number is ${req.params.value}` });
};

module.exports = {
    '/': {
        get: {
            action: index,
            level: 'public'
        }
    },
    '/number/:value': {
        get: {
            action: number,
            level: 'member'
        }
    }
};
