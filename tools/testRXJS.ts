import {
    bufferCount,
    bufferWhen,
    concatMap,
    expand,
    map,
    mapTo,
    mergeMap,
    mergeMapTo,
    mergeScan,
    pairwise,
    pluck,
    reduce,
    repeat,
    repeatWhen,
    scan,
    switchMap,
    switchMapTo,
    take
} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
//import {of} from "rxjs/observable/pa";
import {zip} from "rxjs/observable/zip";
import {from} from "rxjs/observable/from";
import {Observer} from "rxjs/Observer";
import {interval} from "rxjs/observable/interval";
import {Scheduler} from "rxjs/Rx";
import {forkJoin} from "rxjs/observable/forkJoin";
import {bindCallback} from "rxjs/observable/bindCallback";
import {defer} from "rxjs/observable/defer";
import {empty} from "rxjs/observable/empty";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";
import {fromPromise} from "rxjs/observable/fromPromise";
import {merge} from "rxjs/observable/merge";
import {never} from "rxjs/observable/never";
import {timer} from "rxjs/observable/timer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {fromEvent} from "rxjs/observable/fromEvent";
import {SizedocPlanComponent} from "./src/sizedoc/load-resource/load-resource";
import {TestHttp} from "./src/test-http";

const EventEmitter = require('events');
//import * as Rx from 'rxjs/Rx';
//const Rx = require('rxjs/Rx.js');


(function main() {
    console.log('start');

    /*
    let obj = new Object();
    obj["dt"] = new Date();
    obj["id"] = 1;

    console.log(JSON.stringify(obj));
    */
    //console.log(obj.plandate);
    //console.log(typeof obj.plandate);

    //let dt = new Date("2017-12-20T13:00:00");
    /*
    let dt = new Date(Date.parse("2017-12-20T13:00:00"));
    console.log(JSON.stringify(dt));
    console.log(dt.toString());
    console.log(dt.toUTCString());
    */

    //let currentDate = new Date();
    //let currentDate2 = JSON.stringify(currentDate);
    //console.log(currentDate2.toString()); // Now currentDate is in a different format... oh gosh what do we do...
    let currentDate3 = new Date(JSON.parse('2017-12-20T13:00:00'));
    console.log(currentDate3.toString());
    console.log(currentDate3.toUTCString());





    // switchMapTest();
    //let sizedocPlanComponent = new SizedocPlanComponent();
    //sizedocPlanComponent.test();

    //let testHttp = new TestHttp();
    //testHttp.test();

    console.log('end');

})();

/**
 * Последний эмит отменяет все предыдущие эмиты
 * Запомнить как Переключиться на новый обозревабль
 * Т.е. при поступление нового эмита предыдущий теряется
 * если каждый запрос должен быть завершен, то нужно использовать mergeMap
 * */
function switchMapTest () {
    let o = of([1, 2, 3]);
    o.pipe(
        switchMap(x => {
            return from(x);
        }),
        // switchMap
        switchMap(x => {
            console.log(`x = ${x}`);
            return Observable.create((observer) => {
                setTimeout(() => {
                    observer.next(x);
                    observer.complete();
                }, 1000);
            })
        })
        /*,
        reduce((acc, cur: number) => {
            acc.push(cur);
            return acc;
        }, [])
        */
    )
        .subscribe(x => console.log(x),
            (error) => console.log('error'),
            () => console.log('complete')
        );
}

function reduceTest() {
    let o = of(27, 25);
    o.pipe(
        reduce((acc, x: number) => {acc.push(x); return acc;}, [])
    )
        .subscribe(x => console.log(JSON.stringify(x)));
}

/***/
function zipTest() {

    let age$ = of<number>(27, 25, 29);
    let name$ = of<string>('Foo', 'Bar', 'Beer');
    let isDev$ = of<boolean>(true, true, false);
        zip(age$,
            name$,
            isDev$,
            (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
        .subscribe(x => console.log(x));
}

/**
 *switchMapTo - тоже что и switchMapTo, только не принимает входящий параметр, а сразу возвращает обозревабль
 * */
function switchMapToTest() {
    interval(500)
        .pipe(take(4),
            switchMapTo(of(1))
        ).subscribe((x: number) => {
            console.log(x)
        });
}

/**
 * Может аккумулировать значения родительского обозревабля (испускаемые значения - значения аккумулятора)
 * тоже что и mergeScan, только возвращает сразу аккумулятор, а mergeScan возвращает обозреватель типа аккумулятора
 * */
function scanTest() {
    let source = interval(500).take(4);
    // Начальное значение аккумулятора
    let seed = 0;
    // Функция, берет аккумулятор, и испускаемые значения первым обозерваблем, возращает аккумулятор
    let count = source.pipe(scan((acc, current) => acc + current, seed));
    count.subscribe(x => console.log(x));
}
/**
 *Достает из объектов указанное свойство, и испускает его дальше
 * Что то типа map
 * */
function pluckTest() {
    of({a: 1}, {a: 2}).pipe(
        pluck('a')
    ).subscribe(x => console.log(x));
}

/**
 *Делит один обозревабль на да по результату функции (фунция должна возвращать булл)
 * */
function partitionTest() {
    /*
    let pair = interval(500).pipe(take(4), partition<number>((x, index: number) => x % 2 == 0));
    pair[0].subscribe(x => console.log(`x = ${x}`));
    pair[1].subscribe(y => console.log(`y = ${y}`));
    */
}

/**
 * Парует испускаемые значения и возвращает массив
 * 0, 1, 2, 3
 * [ 0, 1 ]
 * [ 1, 2 ]
 * [ 2, 3 ]
 * */
function pairwiseTest() {
    let source = interval(500).pipe(take(4));
    source.pipe(pairwise())
        .subscribe(x => console.log(x));
}

/**
 * Может аккумулировать значения родительского обозревабля (испускаемые значения - значения аккумулятора)
 * */
function mergeScanTest() {
    let source = interval(1000).pipe(take(4));
    // Начальное значение аккумулятора
    let seed = 0;
    // Функция, берет аккумулятор, и испускаемые значения первым обозерваблем, возращает обозревабль типа аккамулятора
    let count = source.pipe(mergeScan((acc, one) => of(acc + one), seed));
    count.subscribe(x => console.log(x));
}

/**
 * Принимает обозервабль
 * Дочерние испускания заменяют родительское
 * тоже что и mergeMap, только игнорит получаемое значение от родитеьского обзервабля
 * */
function mergeMapToTest() {
    interval(1000).pipe(take(4),
        mergeMapTo(of(1, 2))
    )
        .subscribe((
            (result) => {
                console.log(result);
            }
        ));
}

/**
 * Колбэк, принимает значение, возвращает обозревабль
 * Результирующая подписка получает произведение испускаемых значений внешнего и внутреннего обозервабля
 * */
function mergeMapTest() {
    interval(1000).pipe(take(4),
        mergeMap((i) => of(1 * i, 2 * i))
    )
        .subscribe((
            (result) => {
                console.log(result);
            }
        ));
}

/**Конвертит каждое испускаемое значение в константу*/
function mapToTest() {
    of(1, 2, 4).pipe(map (x => x),
        mapTo('qwe')
    )
        .subscribe((
            (result) => {
                console.log(result);
            }
        ));
}

/**Делает пачку обсерваблей, один обсервабль на группу (Объект GroupedObservable наследник обсервабля
 * только имеет свойство key)*/
function groupByTest() {
    /*
    // TODO Посмотреть
    const people = [{name: 'Sue', age: 25}, {name: 'Joe', age: 30}, {name: 'Frank', age: 25}, {name: 'Sarah', age: 35}];
    //emit each person
    const source = from(people);
    //group by age
    const example = source.pipe(groupBy(person => person.age),
    //return as array of each group
    flatMap(group => group.reduce((acc, curr) => {
        //[...acc, curr]
        acc.push(curr);
        return acc;
    }, []));
    //
    // output:
    // [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
    // [{age: 30, name: "Joe"}]
    // [{age: 35, name: "Sarah"}]
    //
    const subscribe = example.subscribe(val => {
            console.log(val);
        }
    );
    */
}

/**Функция получает аргумент, возвращает обозревабль, испущенное значение которого принимается
 * как входящий аргумент при последующей итерации - рекурсивная*/
function expandTest() {
    let observable = of(2);
    let observable2 = observable.pipe(expand(x => of(2 * x).delay(250)),
        take(10)
    );
    observable2.subscribe(x => console.log(x));
}

/**
 * forkJoinTest - Берет массив обозревателей, после их комплита - испускает массив последних их результатов
 * селектор не обязателен, если нет, то массив результатов
 * */
function forkJoinTest() {
    const observable1 = of(1, 11).delay(1000);
    const observable2 = of(2, 22).delay(500);

    const observable3 = forkJoin(observable1, observable2,
        (r1, r2) => {
            return {'r1': r1, 'r2': r2}
        }
    );

    subscribeTest(observable3);
}

/**bindCallback - Получаем из колбэка обсервэйбл*/
function bindCallbackTest() {
    let f = function (param1, param2, callback) {
        callback(`param1 = ${param1}`, `param2 = ${param2}`);
    }
    // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
    let f2 = bindCallback(f, (x, y) => x + '; ' + y, Scheduler.async);
    // Вызываем функцию, получаем обсервэйбл
    let result = f2('test1', 'test2');
    // Запускаем функцию
    result.subscribe(
        (x) => {
            console.log(x);
        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('complete')
        }
    );
}

/**bindNodeCallback - тоже что и bindCallback, только колбэк типа callback(error, result)*/
function bindNodeCallbackTest() {
    let f = function (param1, param2, callback) {
        callback(new Error('www'), `param1 = ${param1}; param2 = ${param2}`);
    }
    // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
    let f2 = bindCallback(f, (x, y) => {
        if (x != null) {
            throw x;
        } else {
            return y;
        }
    }, Scheduler.async);
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
    let observable = Observable.create((observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    }, Scheduler.async);
    subscribeTest(observable);
}

/**defer - В момент подписки использует фабрику для создания Observable (отложенное создание)*/
function deferTest() {

    let observable = defer(
        () => {
            return of(11, 22, 33, Scheduler.async);
        });
    subscribeTest(observable);
}

/**Делает Observable который сразу испускает complete - нужен для композиции с другими обозревателями*/
function emptyTest() {
    let observable = empty(Scheduler.async);
    subscribeTest(observable);
}

/**from -
 * Делает Observable из
 * массива
 * строки - работает как массив символов
 *
 * */
function fromTest() {
    let observable = from('wwqq', Scheduler.async);
    subscribeTest(observable);
}


/**
 * Берет две функции, с указателями на функции обработчики событий.
 * Эти первые функции, навешивают функции параметры на события
 * Вызов события вызывает функцию парметр - которая в свою очередь испускает значение
 * Вызов отписики (вторая функция) будет происходит при отписке от обозреваемого
 * */
function fromEventPatternTest() {

    let ee = new EventEmitter();

    function addClickHandler(handler) {
        ee.on('event', handler);
    }

    function removeClickHandler(handler) {
        ee.removeListener('event', handler);
    }

    var observable = fromEventPattern(
        addClickHandler,
        removeClickHandler
    );

    subscribeTest(observable);

    ee.emit('event', 222);
}

/**Конвертация промиса в обозревайбл*/
function fromPromiseTest() {

    var promise = new Promise(function (resolve, reject) {
        // Испустить значение и сделать комплит
        //resolve(123);
        // Испустить ошибку
        reject('www');
    });
    var observable = fromPromise(promise);
    subscribeTest(observable);
}

/** interval - испускает бесконечную последовательность чисел*/
function intervalTest() {
    var observable = Observable.interval(1000, Scheduler.async);
    subscribeTest(observable);

    setTimeout(() => {
        subscribeTest(observable);
    }, 500);
}

/**merge - Объединяет любое количество обсерваблей с один
 * concurrent - количество соединяемых обсерваблей, остальные будут делаться после комплита первой партии*/
function mergeTest() {
    const observable1 = Observable.create((observer) => {
        observer.next(1);
        setTimeout(() => {
            observer.next(2);
        }, 500);
        setTimeout(() => {
            observer.complete();
        }, 1000);
    });

    const observable2 = Observable.create((observer) => {
        observer.next(10);
        setTimeout(() => {
            observer.next(20);
        }, 400);
        setTimeout(() => {
            observer.complete();
        }, 1500);
    });

    const observable3 = Observable.create((observer) => {
        observer.next(100);
        setTimeout(() => {
            observer.next(200);
        }, 400);
        setTimeout(() => {
            observer.complete();
        }, 1500);
    });

    const observable = merge(observable1, observable2, observable3, 2);

    subscribeTest(observable);

}

/**Создает обсервабль который не испускает ни каких значений, комплитов, и ошибок*/
function neverTest() {
    const observable = never().startWith(7);
    subscribeTest(observable);
}
/**Делает обсервабль который испускает полученные параметры
 * repeat - повторяет обсервабль заданное количество раз
 * */
function ofTest() {
    const observable = of(1, 123, 21, Scheduler.async).pipe(repeat(2));
    subscribeTest(observable);
}

/**
 * repeat - повторяет обсервабль заданное количество раз
 * error - прерывает репит
 * */
function repeatTest() {
    const observable = Observable.create((observer) => {
        observer.next(1);

        //observer.complete();
        observer.error('err 2529rr');
        //
        //observer.next(2);
    }).pipe(repeat(2))
    subscribeTest(observable);
}

/**
 * Повторять пока управляющий обсервабль испускает значения
 * Как только он сделает комплит, зависимый обсервабль тоже сделает комплит
 * Первое испускание значений не зависит от управляющего обсервабля
 * */
function repeatWhenTest() {

    const observable = of(1, 2).pipe(repeatWhen(
        (notifications) => {
            return Observable.create(
                (observer: Observer<number>) => {
                    setTimeout(() => {
                        observer.next(1);
                    }, 100);
                    setTimeout(() => {
                        observer.next(2);
                    }, 200);
                    setTimeout(() => {
                        observer.complete();
                    }, 1000);
                }
            );
        }
    ));
    subscribeTest(observable);
}

/**
 * Попробовать еще раз (при ошибке)
 * Тоже что и репит только делает повтор при возвраще ошибки.
 * Если комплит - то повора не будет.
 * */
function retryTest() {
    const observable = Observable.create(
        (observer) => {
            observer.next(1);
            //observer.error('errr');
            observer.complete();
        }
    ).retry(2);
    subscribeTest(observable);
}

/**
 * Тоже что и интервал, только задает стартовую отсрочку запуска испусканий последовательности
 * */
function timerTest() {
    const observable = timer(1000, 100);
    subscribeTest(observable);
}

/**
 * Группирует значение испускаемые обсерваблем 1 и исупускает их массив при эмите второго обсерваля*/
function bufferTest() {
    const observable1 = interval(100);
    const observable2 = interval(1000);
    subscribeTest(observable1.buffer(observable2));
}

/**
 * Делает буфер по количеству элементов
 * второй параметр - сдвиг счетчика элементов
 * */
function bufferCountTest() {
    const observable = from([1, 2, 3, 4, 5, 6, 7]);
    const buffered = observable.pipe(bufferCount(3, 1));
    subscribeTest(buffered);
}

/**
 * Функция сброса буффера генерится через фабрику, для каждой группы будет новая
 * */
function bufferWhenTest() {
    var observable = Observable.interval(100);
    var buffered = observable.pipe(bufferWhen(
        () => {
            return Observable.create((observer) => {
                setTimeout(() => {
                    //observer.next(1);
                    observer.complete();
                }, 1000);
            })
        }
    ));
    buffered.subscribe(x => console.log(x));

}

/**Игнорит новые испускания родительского обзервабля, до тех пор пока не закомплититься дочерний*/
function exhaustMapTest() {
    let observable1 = interval(6000).pipe(take(2));
    let observable2 = observable1.exhaustMap((ev) => interval(1000).pipe(take(4)));
    observable2.subscribe(x => console.log(x));
}

/**
 * Переходит к следующему внешнему испусканию, только если испускание внутренних завершено.
 * */
function concatMapTestToTest() {
    let observable1 = of(2, 3);
    let observable2 = observable1.concatMapTo(interval(1000).take(4));
    observable2.subscribe(x => console.log(x));
}
/**
 * Объединение двух обсерваблей
 * испускаемое значение первого передается в фабрику внутреннего
 * селектор - функция с парой испущеных значеений двух обсерваблей
 * Выполняется последовательно, до комплита внутреннего обсервабля, потом переходит к следующему значению
 * внешнего обсервабля.
 * */
function concatMapTest() {
    const observable = of(2, 3);
    const result = observable.pipe(concatMap(
        (x) => {
            console.log(`x = ${x}`)
            return of(2, 2)
        },
        (x, y, ix, iy) => x * y
    ));
    subscribeTest(result);
}


function testScheduler() {

    let o2 = of(1, 2, 3);
    let o = o2.observeOn(Scheduler.async);

    let observer = {
        next: (result) => {
            console.log(result);
        },
        error: (error) => {
            console.error('error');
            console.error(error);
        },
        complete: () => {
            console.log('complete');
        }
    }

    o.subscribe(observer);
}

/***/
function testObservable2() {

    let o = Observable.create((observer: Observer<number>) => {
        observer.next(1);
    });


    o
        .map((result) => {
            return result + result;
        })
        .switchMap((result) => {
            let o2 = Observable.create((observer: Observer<Object>) => {
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
    let bs = new BehaviorSubject(0);

    // Сохранять несколько (5) последних эмитов, после комплита никто больше ничего не получит
    //let bs = new Rx.ReplaySubject(5);

    // Подписчики получают последнее испущенное значение после комплита
    //let bs = new Rx.AsyncSubject();


    bs.next(1);

    bs.subscribe((result) => {
        console.log(`s1 = ${result}`);
    });

    bs.next(2);

    setTimeout(() => {
            bs.subscribe((result) => {
                console.log(`s2 = ${result}`);
            })
        }
        , 200);

    bs.next(3);

    bs.complete();

}

function testMulticast() {

    let subject = new Subject();

    let observable = Observable.create(
        (observer: Observer<number>) => {
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

    setTimeout(() => {
        multicast.subscribe(
            (result) => {
                console.log(`2 = ${result}`);
            }
        )
    }, 100);

    // Испустить в субъект значения
    multicast.connect();
    // Аналог observable.subscribe(subject);
}

function testSubject() {
    let subject = new Subject();

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

    o.subscribe(subject);

}

// Генерить испускания в субъекте
let o = Observable.create((observer: Observer<number>) => {
    observer.next(11);
});


/**
 * Делаем источник из функции генератора значений
 * каждый subscribe - запускает генерацию значений в функции
 * */
function testObservable() {
    let i = 1;
    let observableFromFunc = Observable.create((observer: Observer<number>) => {
            // Синхронные вызовы!!!
            observer.next(i++);
            observer.next(i++);

            let cancel = false;

            // Завершаем ошибкой
            let intervalID1 = setTimeout(() => {
                if (!cancel) {
                    //observer.error(new Error('Some error'));
                }
            }, 100);

            // Асинхронный вызов!!!
            let intervalID2 = setTimeout(() => {
                if (!cancel) {
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
    let observable = fromEvent(ee, 'event');
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


function subscribeTest(observable: Observable<any>) {
    observable.subscribe(
        (result) => {
            console.log(result);
        },
        (error) => {
            console.log('err=' + error);
        },
        () => {
            console.log('compete');
        }
    );
}




