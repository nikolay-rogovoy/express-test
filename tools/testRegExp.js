/**
 * Created by Николай on 29.08.2017.
 */
(function main() {
    console.log('main -> start');
    let str = `VGVzdCB0ZXh0OwrQotC10YHRgtC+0LLRi9C5INGC0LXQutGB0YIK`;
    const str2 = new Blob([str], { type: 'text/plain' });
    console.log(str2);
})();
