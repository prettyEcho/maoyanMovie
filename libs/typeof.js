const type = function t(o) {
    const toString = Object.prototype.toString;
    let result = toString.call(o);
    return result.match(/\[object (.*?)\]/)[1].toLowerCase();
};

[
    'Number',
    'String',
    'Boolean',
    'Object',
    'Function',
    'Array',
    'Null',
    'Undefined',
    'RegExp'
].forEach(item => {
    type[`is${item}`] = function(o) {
        return type(o) === item.toLowerCase();
    }
});

module.exports = type;