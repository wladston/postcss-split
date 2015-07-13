'use strict';
var postcss = require('postcss');

var Splitter = postcss.plugin('postcss-split', function (opts) {
  var opts = opts || {};
  var pattern = opts.pattern || /FOLD/;
  if (typeof opts.positive_match !== 'undefined') {
    var positive_match = opts.positive_match;
  }
  else {
    var positive_match = true;
  }
  return function (css, result) {
    var newcss = postcss.root();
    css.eachRule(function (rule) {
      if (rule.toString().match(pattern)){
        if (rule.parent.name != 'media'){
          rule.removeSelf();
          newcss.append(rule);
        } else {
          var mediaq_in_newcss = false;
          newcss.eachAtRule('media', function (mediaq) {
            if (mediaq.params == rule.parent.params) {
              rule.removeSelf();
              mediaq.append(rule);
              mediaq_in_newcss = true;
              return false;
            }
          });
          if (!mediaq_in_newcss) {
            var parent = rule.parent.clone();
            parent.eachRule(function(r) { r.removeSelf(); });
            rule.removeSelf();
            parent.append(rule);
            newcss.append(parent);
          }
        }
      }
    });
    if(positive_match)
      result.root = newcss;
  };
});
module.exports = Splitter;
