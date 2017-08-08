const mapStream = require('map-stream');
let isUtil = require('./isUtil.js');
let replaceUtil = require('./replaceUtil.js');
let reg = require('./regs.js');

const defaultOptions = {
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

module.exports = function (options = defaultOptions) {
    let i = 0;

    let restoreRemToPx = function (file) {
        let lines = file.split(reg.splitReg);

        if( isUtil.isAdd(lines)) {
            return file;
        }

        return lines.map( line => {
            try {
                if(isUtil.isComment(line)) {
                    return line;
                }

                if(isUtil.isFunc(line)) {
                    return replaceUtil.replaceFunc(line, options);
                }
                if(isUtil.isMixin(line)) {
                    return replaceUtil.replaceMixin(line, options);
                }
                if(isUtil.isPx(line)){
                    return replaceUtil.addPxComment(line);
                }
                
                return line;
            } catch (e) {
                console.error(line);
            }
        }).join('\n');

    }

    return mapStream( (data, cb) => {
        let file = data.contents.toString();
        data.contents = new Buffer(restoreRemToPx(file));
        cb(null, data);
    })
}