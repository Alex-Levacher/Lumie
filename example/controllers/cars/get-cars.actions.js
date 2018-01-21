/**
* export Action
*/
module.exports.getAll = function (req, res) {
    return res.status(200).json([
        { brand: 'lamborghini', model: 'Huracan' },
        { brand: 'Tesla', model: 'S P100D' }
    ]);
};

module.exports.getOne = function (req, res) {
    return res.status(200).json({
        brand: 'lamborghini', model: 'Huracan'
    });
};
