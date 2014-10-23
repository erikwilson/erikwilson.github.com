// Copyright (c) 2014, Dan Kaplun <dan@beardtree.com>

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Mustache = require('mustache');
var gravatar = require('gravatar');
var moment = require('moment');

function render (resume) {

  var template = fs.readFileSync(path.resolve(__dirname, 'index.mustache'), 'utf8');

  if (resume.basics && resume.basics.email && resume.basics.email) {
    resume.basics.gravatar = gravatar.url(resume.basics.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
  }
  resume.basics.profiles = (resume.basics.profiles || []).map(function (profile) {
    profile.networkIcon = profile.network.toLowerCase();
    return profile;
  });
  [{
    keys: ['startDate', 'endDate'],
    sections: [resume.work, resume.education]
  }, {
    keys: ['date'],
    sections: [resume.awards]
  }].forEach(function (opts) {
    opts.sections
      .filter(Boolean)
      .forEach(function (section) {
        section.forEach(function (event) {
          opts.keys.forEach(function (key) {
            if (event[key]) {
              event[key + 'Readable'] = moment(event[key]).format('MMMM YYYY');
            } else {
              console.log("no " + key + " in " + JSON.stringify(event));
            }
          });
        });
      });
  });

  return Mustache.render(template, {resume: resume});
}
module.exports = { render: render };
