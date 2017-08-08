exports.isFunc = function(str) {
    return str.indexOf('@include') >= 0;
}

exports.isMixin = function(str) {
    return /\((\d+)(px)*\)/.test(str);
}

exports.isPx = function(str) {
    try {
        return str.indexOf('px') >= 0;
    } catch(e) {
        console.error(str)
    }
}