/**
 * Created by Николай on 29.08.2017.
 */
(function main() {
    console.log('main -> start');
<<<<<<< HEAD
    let str = `VGVzdCB0ZXh0OwrQotC10YHRgtC+0LLRi9C5INGC0LXQutGB0YIK`;
    const str2 = new Blob([str], { type: 'text/plain' });
    console.log(str2);
=======
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });
    console.log(process.env.ID);
    /*
        let s = 'idorderdoc';
      let regEx = /^id/;
    
      s = s.replace(/^id/, '');
    
      console.log(s);
    */
>>>>>>> b6fc8fbc195b3f037df8e4f0f510264a7ef0e539
})();
