
const index = function (req, res) {
    res.json({ data: 'I am a minimal implementation' });
};

const number = function (req, res) {
    res.json({ data: `The number is ${req.params.value}` });
};

const tiny = function (req, res) {
    res.json({ data: "You can't do easier" });
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
