const levelFcts = {
    public: (req, res, next) => next(),
    member: (req, res, next) => (req.user ? next() : res.sendStatus(401))
};

module.exports = level => (req, res, next) => levelFcts[level](req, res, next);
