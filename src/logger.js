module.exports.verbose = false;

module.exports.log = (msg) => {
    if (this.verbose) console.log(msg);
};
