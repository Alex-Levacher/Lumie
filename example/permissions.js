const checkPublic = (req, res, next) => next();

const checkMember = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).end();
};

const funcRefs = {
    public: checkPublic,
    member: checkMember
};

module.exports = level => (req, res, next) => funcRefs[level](req, res, next);
