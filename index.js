const mapStream = require('map-stream');
let isUtil = require('./isUtil.js');
let replaceUtil = require('./replaceUtil.js');

module.exports = function (options) {
    let i = 0;

    let restoreRemToPx = function (file) {
        return file.split('\n').map(line => line.split('\r').map( line => {
            if(isUtil.isFunc(line)) {
                return replaceUtil.replaceFunc(line, options);
            }
            else if(isUtil.isMixin(line)) {
                return replaceUtil.replaceMixin(line, options);
            }
            else if(isUtil.isPx(line)){
                return replaceUtil.addPxComment(line);
            }
            else {
                return line;
            }
        }).join('\r')).join('\n');

    }

    return mapStream( (data, cb) => {
        let file = data.contents.toString();
        data.contents = new Buffer(restoreRemToPx(file));
        cb(null, data);
    })
}