module.exports.verbose = false;

module.exports.log = (msg) => {
    /* eslint no-console: 0 */
    if (this.verbose) console.log(msg);
};
