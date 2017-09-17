const EventEmitter = require('events');
import * as Rx from 'rxjs/Rx';
//const Rx = require('rxjs/Rx.js');


(function main() {
  console.log('start');

  fromTest();

  console.log('end');

})();


/**bindCallback - Получаем из колбэка обсервэйбл*/
function bindCallbackTest() {
  let f = function(param1, param2, callback) {
    callback(`param1 = ${param1}`, `param2 = ${param2}`);
  }
  // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
  let f2 = Rx.Observable.bindCallback(f, (x, y) => x + '; ' + y, Rx.Scheduler.async);
  // Вызываем функцию, получаем обсервэйбл
  let result = f2('test1', 'test2');
  // Запускаем функцию
  result.subscribe(
    (x) => {
      console.log(x);
    }
  );
}

/**bindNodeCallback - тоже что и bindCallback, только колбэк типа callback(error, result)*/
function bindNodeCallbackTest() {
  let f = function (param1, param2, callback) {
    callback(new Error('www'), `param1 = ${param1}; param2 = ${param2}`);
  }
  // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
  let f2 = Rx.Observable.bindCallback(f, (x, y) => {
    if (x != null) {
      throw x;
    } else {
      return y;
    }
  }, Rx.Scheduler.async);
  // Вызываем функцию, получаем обсервэйбл
  let result = f2('test1', 'test2');
  // Запускаем функцию
  result.subscribe(
    (x) => {
      console.log(x);
    },
    (error) => {
      console.error(error);
    });
}

/**create Функция геератор вызывается для каждого подписчика*/
function crateTest() {
  let observable = Rx.Observable.create((observer: Rx.Observer<number>) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  }, Rx.Scheduler.async);
  subscribeTest(observable);
}

/**defer - В момент подписки использует фабрику для создания Observable (отложенное создание)*/
function deferTest() {

  let observable = Rx.Observable.defer(
    () => {
      return Rx.Observable.of(11, 22, 33);
    });
  subscribeTest(observable);
}

/**Делает Observable который сразу испускает complete - нужен для композиции с другими обозревателями*/
function emptyTest() {
  let observable = Rx.Observable.empty(Rx.Scheduler.async);
  subscribeTest(observable);
}

/**from -
 * Делает Observable из
 * массива
 * строки - работает как массив символов
 *
 * */
function fromTest() {
  let observable = Rx.Observable.from('wwqq', Rx.Scheduler.async);
  subscribeTest(observable);
}

/***/
function Test5() {

}

/***/
function Test6() {

}




function testScheduler() {

  let o2 = Rx.Observable.of(1, 2, 3);
  let o = o2.observeOn(Rx.Scheduler.async);

  let observer = {
    next: (result) => {console.log(result);},
    error: (error) => {console.error('error');console.error(error);},
    complete: () => {console.log('complete');}
  }

  o.subscribe(observer);
}

/***/
function testObservable2(){

  let o = Rx.Observable.create((observer: Rx.Observer<number>) => {
    observer.next(1);
  });



  o
    .map((result) => {
      return result + result;
    })
    .switchMap((result) => {
      let o2 = Rx.Observable.create((observer: Rx.Observer<Object>) => {
        observer.next({'q': result, 'w': 1});
      });
      return o2;
    })
    .subscribe(
    (result) => {
      console.log('result = ');
      console.log(result);
    }
  );

}

function testBehaviorSubject() {


  // Сохранять последнй эмит
  let bs = new Rx.BehaviorSubject(0);

  // Сохранять несколько (5) последних эмитов, после комплита никто больше ничего не получит
  //let bs = new Rx.ReplaySubject(5);

  // Подписчики получают последнее испущенное значение после комплита
  //let bs = new Rx.AsyncSubject();


  bs.next(1);

  bs.subscribe((result)=>{
    console.log(`s1 = ${result}`);
  });

  bs.next(2);

  setTimeout(() =>{
      bs.subscribe((result)=>{
        console.log(`s2 = ${result}`);
      })
    }
    , 200);

  bs.next(3);

  bs.complete();

}

function testMulticast() {

  let subject = new Rx.Subject();

  let observable = Rx.Observable.create(
    (observer: Rx.Observer<number>) => {
      observer.next(1);
    }
  );

  // По сути субъект, в который при вызове connect испускатель генерит значения
  let multicast = observable.multicast(subject);

  // Подписки на  субъект
  multicast.subscribe(
    (result) => {
      console.log(`1 = ${result}`);
    }
  );

  setTimeout(()=>{
  multicast.subscribe(
    (result) => {
      console.log(`2 = ${result}`);
    }
  )}, 100);

  // Испустить в субъект значения
  multicast.connect();
  // Аналог observable.subscribe(subject);
}

function testSubject() {
  let subject = new Rx.Subject();

  subject.subscribe(
    (v) => console.log(`observer A: ${v}`),
    (error) => console.log(`Ошибка А: ${error}`),
    () => console.log(`Завершено А`),
  );

  setTimeout(() => {
      subject.subscribe(
        (v) => console.log(`observer B: ${v}`),
        (error) => console.log(`Ошибка B: ${error}`),
        () => console.log(`Завершено B`),
      )
    }, 100
  );

  subject.next(1);
  subject.next(2);

  setTimeout(() => {
    subject.next(3);
  }, 500);

  setTimeout(() => {
    subject.error(new Error('Какая-то ошибка'));
  }, 400);

  setTimeout(() => {
    subject.complete();
  }, 300);

  // Генерить испускания в субъекте
  let o = Rx.Observable.create((observer: Rx.Observer<number>) => {
    observer.next(11);
  });

  o.subscribe(subject);

}


/**
 * Делаем источник из функции генератора значений
 * каждый subscribe - запускает генерацию значений в функции
 * */
function testObservable() {
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

}

/**События*/
function testEventEmitter() {

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
}


function subscribeTest(observable: Rx.Observable<any>) {
  observable.subscribe(
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    },
    () => {
      console.log('compete');
    }
  );
}
