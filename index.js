const fs = require('fs');
const YAML = require('yaml');
const _ = require('lodash');
const traverse = require('traverse');
const Walk = require('walkjs');
const crawl = require('tree-crawl');
const deepForEach = require('deep-for-each');
const yaml = require('js-yaml');

const labels = {};
const annotations = {};

fs.readdirSync('charts').forEach(file => {
  const yamlStr = fs.readFileSync('charts/' + file, "utf8");

  yaml.safeLoadAll(yamlStr, function (doc) {

    deepForEach(doc, (value, key, subject, path) => {
      if (key.toLowerCase && key.toLowerCase() === 'labels') {
        _.assign(labels, value);
      }
    });

    deepForEach(doc, (value, key, subject, path) => {
      if (key.toLowerCase && key.toLowerCase() === 'annotations') {
        _.assign(annotations, value);
      }
    });
  });
});

console.log(labels);
console.log(annotations);

