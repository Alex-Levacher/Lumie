/**
* export Actions
*/
module.exports.getAll = (req, res) => {
    res.status(200).json([
        { brand: 'lamborghini', model: 'Huracan' },
        { brand: 'Tesla', model: 'S P100D' }
    ]);
};

module.exports.getOne = (req, res) => {
    res.status(200).json({
        brand: 'lamborghini', model: 'Huracan'
    });
};
