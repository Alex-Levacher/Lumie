/**
* export Middlewares
*/
module.exports.middlewares = [
    // Insert your middlewares here
];

/**
* export Action
*/
module.exports.action = function (req, res) {
    return res.status(200).json({ msg: 'Your car have been created' });
};
