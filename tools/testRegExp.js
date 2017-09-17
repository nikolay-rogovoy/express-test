/**
 * Created by Николай on 29.08.2017.
 */
(function main() {
    console.log('main -> start');
    let s = 'idorderdoc';
    let regEx = /^id/;
    s = s.replace(/^id/, '');
    console.log(s);
})();
