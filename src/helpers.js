function JoinPathSlash(path) {
    return path.replace(/\\/g, '/');
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, letter => letter.toUpperCase()).replace(/\s|[-.]+/g, '');
}

module.exports = {
    JoinPathSlash,
    capitalize,
    camelize
};
