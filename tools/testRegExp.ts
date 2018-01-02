/**
 * Created by Николай on 29.08.2017.
 */

(function main() {
  console.log('main -> start');


    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });

    console.log(process.env.ID)

/*
    let s = 'idorderdoc';
  let regEx = /^id/;

  s = s.replace(/^id/, '');

  console.log(s);
*/


})();

