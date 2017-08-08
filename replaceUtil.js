let regs = require('./regs.js');




exports.replaceFunc = function(line, options) {
    const funcName = regs.getFuncNameReg.exec(line)[3].trim(),
            option = options.func[funcName];
        
    if(option) {
        if(option.attr) {
            let reg =  regs.getFuncReg1(funcName);
            line = line.replace(reg, option.attr + ": "+"$1" );
            if(option.isDpr) {
                line += '/*px*/';
            }
        } else {
            let reg =  regs.getFuncReg2(funcName),
                matches = reg.exec(line);
            line = matches[1] + matches[2].replace(',', ":") + ";";
        }
    }

    return line;
  }

exports.replaceMixin = function(line, options) {

    const minxinNames = Object.keys(options.mixin);
    
    minxinNames.map(mixinName => {
        let option = options.mixin[mixinName];
        line = line.replace(regs.getMixinReg(mixinName), "$1"+ "$2"+ "px") + (option.isDpr ? '/*px*/' : '');
    })
    
    return line;
}

exports.addPxComment = function(line) {
    return line + '/*no*/';
}