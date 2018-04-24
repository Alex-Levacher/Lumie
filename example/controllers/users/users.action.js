module.exports.create = (req, res) => {
    res.status(200).json({ msg: 'The User have been created' });
};

module.exports.getOne = (req, res) => {
    res.status(200).json({
        name: 'Alex', age: '24'
    });
};

module.exports.getAll = (req, res) => {
    res.status(200).json([
        { name: 'Alex', age: '24' },
        { name: 'Flow', age: '24' },
        { name: 'Auré', age: '25' }
    ]);
};
