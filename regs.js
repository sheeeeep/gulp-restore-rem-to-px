exports.getFuncNameReg = /(@include)(\s+)(.+)\(/;
exports.getMixinNameReg = /:\s+(.+)\((.+)\)/;

exports.getMixinReg = function(mixinName) {
    return reg = new RegExp(mixinName + '\\((-)*(\\d+)(px)*\\)', 'g');
}

exports.getFuncReg1 = function(funcName) {
    return reg = new RegExp('@include\\s+' + funcName + '\\((.+)\\)', 'g');
}

exports.getFuncReg2 = function(funcName) {
    return reg = new RegExp('(\\s*)@include\\s+' + funcName + '\\((.+)\\)', 'g');
}
