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

exports.isAdd = function(lines) {
    return lines.some( line => line.indexOf('/*px*/')>=0 || line.indexOf('/*no*/')>=0);
}

exports.isComment = function(line) {
    return line.indexOf('//')>=0 || line.indexOf('**')>=0;
}