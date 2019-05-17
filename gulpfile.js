const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const fs = require('fs');
const del = require('del');

function convert() {
	
  var json = JSON.parse(fs.readFileSync('./css/input.json', {encoding: 'utf8'}));

  var templateString = fs.readFileSync('./css/template.scss', {encoding: 'utf8'});
	
  for(var i=0;i< json.length; i++){
	  var outputString = templateString.replace("{{colorPlaceHolder}}", json[i].color);
	  
	  fs.writeFileSync('./css/' + json[i].name + ".scss", outputString, 'utf8');
  }	  

  return src(['./css/*.scss', '!./css/template.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
}

function clean() {
  return del(['./css/*.scss', "!./css/template.scss"]);
}

exports.default = series(convert, clean);