/**
* export Middlewares
*/
module.exports.middlewares = [
    // Insert your middlewares here
];

/**
* export Action
*/
module.exports.action = (req, res) => {
    res.status(200).json({ msg: 'Your car have been created' });
};
