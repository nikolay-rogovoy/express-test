/**
 * Created by Николай on 27.09.2017.
 */
(async function main () {

  console.log('start');

  let res = await getPromise();
  console.log(`before end -> ${res}`);


  console.log('end');

})();

async function usePromise() {
  console.log('usePromise -> start');
  let res = await getPromise();
  console.log(`res = ${res}`);
  console.log('usePromise -> end');
  return res;
}

function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve');
    }, 10);
  });
}

