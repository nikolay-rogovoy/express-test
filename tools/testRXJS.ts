const EventEmitter = require('events');
//import * as Rx from 'rxjs/Rx';
const Rx = require('rxjs/Rx.js');


(function main() {
  console.log('start');

  ////////////////////////////////////////
  // События
  let ee = new EventEmitter();

  // Регистрация события
  ee.on('event', (result) => {
    console.log(`ee.on result = ${result}`);
  });

  // Делаем источник из события
  let observable = Rx.Observable.fromEvent(ee, 'event');
  observable
    .subscribe((result) => {
      console.log(`subscribe result ${result}`);
    });

  // Генерим событие
  setTimeout(() => {
    //console.log(`emit ee`)
    //ee.emit('event', 'some_value');
  }, 500);


  ////////////////////////////////////////
  // Делаем источник из функции генератора значений
  // каждый subscribe - запускает генерацию значений в функции
  let i = 1;
  let observableFromFunc = Rx.Observable.create((observer: Rx.Observer<number>) => {
      // Синхронные вызовы!!!
      observer.next(i++);
      observer.next(i++);

      let cancel = false;

      // Завершаем ошибкой
      let intervalID1 = setTimeout(() => {
        if(!cancel) {
          //observer.error(new Error('Some error'));
        }
      }, 100);

      // Асинхронный вызов!!!
      let intervalID2 = setTimeout(() => {
        if(!cancel) {
          observer.next(i++);
          // Завершаем комплитом
          observer.complete();
        }
      }, 500);

      // Функция отмены подписки, для отчистки используемых ресурсов
      // Вызывается при отписке, комплите или ерроре
      return () => {
        console.log(`Освободить ресурсы в функции генераторе.`);
        cancel = true;
        clearInterval(intervalID1);
        clearInterval(intervalID2);
      };
    }
  );

  console.log('Перед подпиской 1');

  //Запустили генеарацию сразу, получили 1, 2, .... 3
  let subscription = observableFromFunc.subscribe((result) => {
    console.log(`observableFromFunc1 result = ${result}`);
  });

  // Отписываемся
  subscription.unsubscribe();

  console.log('После 1 перед 2');

  //Запустили генеарацию позже, получили 4, 5, .... 6
  setTimeout(() => {
    observableFromFunc.subscribe((result) => {
        console.log(`observableFromFunc2 result = ${result}`);
      },
      (error) => {
        console.log(`observableFromFunc2 error = ${error}`);
      },
      () => {
        console.log(`observableFromFunc2 complete`);
      }

    );
  }, 1500);

  console.log('После 2');

  /*
  let v = Rx.Observable.of(1, 2, 3).map(
    (x) => {
      return x + '!!!';
    }
  ); // etc;

  v.subscribe(
    (res) => {
      console.log(res)
    }
  );
  */

})();

