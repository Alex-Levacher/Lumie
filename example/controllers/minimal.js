
const index = function (req, res) {
    res.json({ msg: 'I am a minimal implementation' });
};

const number = function (req, res) {
    res.json({ msg: `The number is ${req.params.value}` });
};

const tiny = function (req, res) {
    res.json({ msg: "You can't do easier" });
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
    },
    '/tiny': {
        get: tiny
    }
};
