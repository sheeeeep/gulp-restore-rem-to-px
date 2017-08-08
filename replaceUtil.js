let regs = require('./regs.js');


const options = {
    mixin: {
        rem: {
            isDpr: false
        }
    },
    func: {
        px2rem: {
            isDpr: false,
        },
        'font-dpr': {
            isDpr: true,
            attr: 'font-size'
        }
    }
};

exports.replaceFunc = function(line, options=options ) {
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

exports.replaceMixin = function(line, options=options) {
    const mixinName = regs.getMixinNameReg.exec(line)[1].trim(),
          option = options.mixin[mixinName];

    return line.replace(regs.getMixinReg(mixinName), "$1"+ "$2"+ "px") + (option.isDpr ? '/*px*/' : '');
}

exports.addPxComment = function(line) {
    return line + '/*no*/';
}