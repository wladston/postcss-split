#! /usr/bin/env node
var fs = require('fs');
var postcss = require('postcss');
var Split = require('postcss-split');
var path = require('path');

if (process.argv.length < 2) {
    console.log("Usage: " + process.argv[2] + " <file.css>");
    process.exit(-1);
}

var inputf = process.argv[2];;

if (inputf.indexOf('.css', inputf.length - 4) === -1) {
  console.log('Please input a filename that ends with .css.');
  console.log(inputf);
  process.exit(1);
}

var f_full = path.resolve(inputf);
if (!fs.existsSync(f_full)) {
  console.log('The file ' + f_full + ' does not exist.');
  process.exit(1);
}

var criticf = inputf.substring(0, inputf.length - 4) + '-critical.css';
var ncriticf = inputf.substring(0, inputf.length - 4) + '-noncritical.css';

var f_crit = path.resolve(criticf)
var f_non_crit = path.resolve(ncriticf)

var css = fs.readFileSync(f_full);
var opts = {pattern: /!CRITICAL/i};

// Critical CSS.
opts.positive_match = true;
fs.writeFileSync(f_crit, postcss(Split(opts)).process(css).css);

// Non-Critical CSS.
opts.positive_match = false;
fs.writeFileSync(f_non_crit, postcss(Split(opts)).process(css).css);
