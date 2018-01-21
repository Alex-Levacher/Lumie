const checkPublic = (req, res, next) => next();

const checkMember = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).end();
};

const levelRefs = {
    public: checkPublic,
    member: checkMember
};

module.exports = level => (req, res, next) => levelRefs[level](req, res, next);
