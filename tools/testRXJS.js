"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const Observable_1 = require("rxjs/Observable");
const of_1 = require("rxjs/observable/of");
//import {of} from "rxjs/observable/pa";
const zip_1 = require("rxjs/observable/zip");
const from_1 = require("rxjs/observable/from");
const interval_1 = require("rxjs/observable/interval");
const Rx_1 = require("rxjs/Rx");
const forkJoin_1 = require("rxjs/observable/forkJoin");
const bindCallback_1 = require("rxjs/observable/bindCallback");
const defer_1 = require("rxjs/observable/defer");
const empty_1 = require("rxjs/observable/empty");
const fromEventPattern_1 = require("rxjs/observable/fromEventPattern");
const fromPromise_1 = require("rxjs/observable/fromPromise");
const merge_1 = require("rxjs/observable/merge");
const never_1 = require("rxjs/observable/never");
const timer_1 = require("rxjs/observable/timer");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Subject_1 = require("rxjs/Subject");
const fromEvent_1 = require("rxjs/observable/fromEvent");
const EventEmitter = require('events');
//import * as Rx from 'rxjs/Rx';
//const Rx = require('rxjs/Rx.js');
class TestClass {
    constructor(f1, f2) {
        this.f1 = f1;
        this.f2 = f2;
    }
}
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
    //let currentDate3 = new Date();
    //console.log(JSON.stringify(currentDate3));
    //console.log(currentDate3.toUTCString());
    // switchMapTest();
    //let sizedocPlanComponent = new SizedocPlanComponent();
    //sizedocPlanComponent.test();
    //let testHttp = new TestHttp();
    //testHttp.test();
    //console.log(Object.prototype.toString.call(o));
    //throwTest();
    of_1.of([[1, 2], [3, 4], [5, 6]])
        .pipe(operators_1.mergeMap((x) => {
        let res = [];
        for (let arr of x) {
            for (let item of arr) {
                // return of(item)
                res.push(item);
            }
        }
        return from_1.from(res);
    }))
        .subscribe((x) => {
        console.log(x);
    });
    // console.log('test error');
    // of(0, 1, 2)
    //     .pipe(
    //         map((num) => {
    //             if (num === 1)
    //                 throw new Error('qweqwe');
    //             return num;
    //         })
    //     )
    //     .subscribe((num) => {
    //             console.log(num);
    //         },
    //         (error) => {
    //             console.error(error);
    //         }
    //     );
    //
    // console.log('end');
})();
function throwTest() {
    of_1.of(0, 1, 2)
        .pipe(operators_1.switchMap(x => of_1.of(x)), operators_1.switchMap(x => {
        return of_1.of(x)
            .pipe(operators_1.map((val) => {
            if (val === 2) {
                //return _throw(val);
                throw val;
            }
            else {
                return val;
            }
        }), operators_1.mapTo(10));
    }), operators_1.switchMap(x => {
        console.log(x);
        return of_1.of(x);
    }))
        .subscribe((res) => {
        console.log(`res = ${res}`);
    }, (error) => {
        console.log(`error = ${error}`);
    });
}
/***/
function getType(obj) {
    return Object.prototype.toString.call(obj);
}
/***/
function test123() {
    of_1.of(of_1.of(true), of_1.of(false), of_1.of(true), of_1.of(true))
        .pipe(operators_1.mergeAll(), operators_1.filter(x => !x), operators_1.isEmpty())
        .subscribe((res) => {
        console.log(res);
    });
}
/**
 * Последний эмит отменяет все предыдущие эмиты
 * Запомнить как Переключиться на новый обозревабль
 * Т.е. при поступление нового эмита предыдущий теряется
 * если каждый запрос должен быть завершен, то нужно использовать mergeMap
 * */
function switchMapTest() {
    let o = of_1.of([1, 2, 3]);
    o.pipe(operators_1.switchMap(x => {
        return from_1.from(x);
    }), 
    // switchMap
    operators_1.switchMap(x => {
        console.log(`x = ${x}`);
        return Observable_1.Observable.create((observer) => {
            setTimeout(() => {
                observer.next(x);
                observer.complete();
            }, 1000);
        });
    })
    /*,
    reduce((acc, cur: number) => {
        acc.push(cur);
        return acc;
    }, [])
    */
    )
        .subscribe(x => console.log(x), (error) => console.log('error'), () => console.log('complete'));
}
function reduceTest() {
    let o = of_1.of(27, 25);
    o.pipe(operators_1.reduce((acc, x) => { acc.push(x); return acc; }, []))
        .subscribe(x => console.log(JSON.stringify(x)));
}
/***/
function zipTest() {
    let age$ = of_1.of(27, 25, 29);
    let name$ = of_1.of('Foo', 'Bar', 'Beer');
    let isDev$ = of_1.of(true, true, false);
    zip_1.zip(age$, name$, isDev$, (age, name, isDev) => ({ age, name, isDev }))
        .subscribe(x => console.log(x));
}
/**
 *switchMapTo - тоже что и switchMapTo, только не принимает входящий параметр, а сразу возвращает обозревабль
 * */
function switchMapToTest() {
    interval_1.interval(500)
        .pipe(operators_1.take(4), operators_1.switchMapTo(of_1.of(1))).subscribe((x) => {
        console.log(x);
    });
}
/**
 * Может аккумулировать значения родительского обозревабля (испускаемые значения - значения аккумулятора)
 * тоже что и mergeScan, только возвращает сразу аккумулятор, а mergeScan возвращает обозреватель типа аккумулятора
 * */
function scanTest() {
    let source = interval_1.interval(500).take(4);
    // Начальное значение аккумулятора
    let seed = 0;
    // Функция, берет аккумулятор, и испускаемые значения первым обозерваблем, возращает аккумулятор
    let count = source.pipe(operators_1.scan((acc, current) => acc + current, seed));
    count.subscribe(x => console.log(x));
}
/**
 *Достает из объектов указанное свойство, и испускает его дальше
 * Что то типа map
 * */
function pluckTest() {
    of_1.of({ a: 1 }, { a: 2 }).pipe(operators_1.pluck('a')).subscribe(x => console.log(x));
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
    let source = interval_1.interval(500).pipe(operators_1.take(4));
    source.pipe(operators_1.pairwise())
        .subscribe(x => console.log(x));
}
/**
 * Может аккумулировать значения родительского обозревабля (испускаемые значения - значения аккумулятора)
 * */
function mergeScanTest() {
    let source = interval_1.interval(1000).pipe(operators_1.take(4));
    // Начальное значение аккумулятора
    let seed = 0;
    // Функция, берет аккумулятор, и испускаемые значения первым обозерваблем, возращает обозревабль типа аккамулятора
    let count = source.pipe(operators_1.mergeScan((acc, one) => of_1.of(acc + one), seed));
    count.subscribe(x => console.log(x));
}
/**
 * Принимает обозервабль
 * Дочерние испускания заменяют родительское
 * тоже что и mergeMap, только игнорит получаемое значение от родитеьского обзервабля
 * */
function mergeMapToTest() {
    interval_1.interval(1000).pipe(operators_1.take(4), operators_1.mergeMapTo(of_1.of(1, 2)))
        .subscribe(((result) => {
        console.log(result);
    }));
}
/**
 * Колбэк, принимает значение, возвращает обозревабль
 * Результирующая подписка получает произведение испускаемых значений внешнего и внутреннего обозервабля
 * */
function mergeMapTest() {
    interval_1.interval(1000).pipe(operators_1.take(4), operators_1.mergeMap((i) => of_1.of(1 * i, 2 * i)))
        .subscribe(((result) => {
        console.log(result);
    }));
}
/**Конвертит каждое испускаемое значение в константу*/
function mapToTest() {
    of_1.of(1, 2, 4).pipe(operators_1.map(x => x), operators_1.mapTo('qwe'))
        .subscribe(((result) => {
        console.log(result);
    }));
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
    let observable = of_1.of(2);
    let observable2 = observable.pipe(operators_1.expand(x => of_1.of(2 * x).delay(250)), operators_1.take(10));
    observable2.subscribe(x => console.log(x));
}
/**
 * forkJoinTest - Берет массив обозревателей, после их комплита - испускает массив последних их результатов
 * селектор не обязателен, если нет, то массив результатов
 * */
function forkJoinTest() {
    const observable1 = of_1.of(1, 11).delay(1000);
    const observable2 = of_1.of(2, 22).delay(500);
    const observable3 = forkJoin_1.forkJoin(observable1, observable2, (r1, r2) => {
        return { 'r1': r1, 'r2': r2 };
    });
    subscribeTest(observable3);
}
/**bindCallback - Получаем из колбэка обсервэйбл*/
function bindCallbackTest() {
    let f = function (param1, param2, callback) {
        callback(`param1 = ${param1}`, `param2 = ${param2}`);
    };
    // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
    let f2 = bindCallback_1.bindCallback(f, (x, y) => x + '; ' + y, Rx_1.Scheduler.async);
    // Вызываем функцию, получаем обсервэйбл
    let result = f2('test1', 'test2');
    // Запускаем функцию
    result.subscribe((x) => {
        console.log(x);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('complete');
    });
}
/**bindNodeCallback - тоже что и bindCallback, только колбэк типа callback(error, result)*/
function bindNodeCallbackTest() {
    let f = function (param1, param2, callback) {
        callback(new Error('www'), `param1 = ${param1}; param2 = ${param2}`);
    };
    // Получаем функцию, передаем функцию, функцию обработки возврата результата, тип шедулера
    let f2 = bindCallback_1.bindCallback(f, (x, y) => {
        if (x != null) {
            throw x;
        }
        else {
            return y;
        }
    }, Rx_1.Scheduler.async);
    // Вызываем функцию, получаем обсервэйбл
    let result = f2('test1', 'test2');
    // Запускаем функцию
    result.subscribe((x) => {
        console.log(x);
    }, (error) => {
        console.error(error);
    });
}
/**create Функция геератор вызывается для каждого подписчика*/
function crateTest() {
    let observable = Observable_1.Observable.create((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    }, Rx_1.Scheduler.async);
    subscribeTest(observable);
}
/**defer - В момент подписки использует фабрику для создания Observable (отложенное создание)*/
function deferTest() {
    let observable = defer_1.defer(() => {
        return of_1.of(11, 22, 33, Rx_1.Scheduler.async);
    });
    subscribeTest(observable);
}
/**Делает Observable который сразу испускает complete - нужен для композиции с другими обозревателями*/
function emptyTest() {
    let observable = empty_1.empty(Rx_1.Scheduler.async);
    subscribeTest(observable);
}
/**from -
 * Делает Observable из
 * массива
 * строки - работает как массив символов
 *
 * */
function fromTest() {
    let observable = from_1.from('wwqq', Rx_1.Scheduler.async);
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
    var observable = fromEventPattern_1.fromEventPattern(addClickHandler, removeClickHandler);
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
    var observable = fromPromise_1.fromPromise(promise);
    subscribeTest(observable);
}
/** interval - испускает бесконечную последовательность чисел*/
function intervalTest() {
    var observable = Observable_1.Observable.interval(1000, Rx_1.Scheduler.async);
    subscribeTest(observable);
    setTimeout(() => {
        subscribeTest(observable);
    }, 500);
}
/**merge - Объединяет любое количество обсерваблей с один
 * concurrent - количество соединяемых обсерваблей, остальные будут делаться после комплита первой партии*/
function mergeTest() {
    const observable1 = Observable_1.Observable.create((observer) => {
        observer.next(1);
        setTimeout(() => {
            observer.next(2);
        }, 500);
        setTimeout(() => {
            observer.complete();
        }, 1000);
    });
    const observable2 = Observable_1.Observable.create((observer) => {
        observer.next(10);
        setTimeout(() => {
            observer.next(20);
        }, 400);
        setTimeout(() => {
            observer.complete();
        }, 1500);
    });
    const observable3 = Observable_1.Observable.create((observer) => {
        observer.next(100);
        setTimeout(() => {
            observer.next(200);
        }, 400);
        setTimeout(() => {
            observer.complete();
        }, 1500);
    });
    const observable = merge_1.merge(observable1, observable2, observable3, 2);
    subscribeTest(observable);
}
/**Создает обсервабль который не испускает ни каких значений, комплитов, и ошибок*/
function neverTest() {
    const observable = never_1.never().startWith(7);
    subscribeTest(observable);
}
/**Делает обсервабль который испускает полученные параметры
 * repeat - повторяет обсервабль заданное количество раз
 * */
function ofTest() {
    const observable = of_1.of(1, 123, 21, Rx_1.Scheduler.async).pipe(operators_1.repeat(2));
    subscribeTest(observable);
}
/**
 * repeat - повторяет обсервабль заданное количество раз
 * error - прерывает репит
 * */
function repeatTest() {
    const observable = Observable_1.Observable.create((observer) => {
        observer.next(1);
        //observer.complete();
        observer.error('err 2529rr');
        //
        //observer.next(2);
    }).pipe(operators_1.repeat(2));
    subscribeTest(observable);
}
/**
 * Повторять пока управляющий обсервабль испускает значения
 * Как только он сделает комплит, зависимый обсервабль тоже сделает комплит
 * Первое испускание значений не зависит от управляющего обсервабля
 * */
function repeatWhenTest() {
    const observable = of_1.of(1, 2).pipe(operators_1.repeatWhen((notifications) => {
        return Observable_1.Observable.create((observer) => {
            setTimeout(() => {
                observer.next(1);
            }, 100);
            setTimeout(() => {
                observer.next(2);
            }, 200);
            setTimeout(() => {
                observer.complete();
            }, 1000);
        });
    }));
    subscribeTest(observable);
}
/**
 * Попробовать еще раз (при ошибке)
 * Тоже что и репит только делает повтор при возвраще ошибки.
 * Если комплит - то повора не будет.
 * */
function retryTest() {
    const observable = Observable_1.Observable.create((observer) => {
        observer.next(1);
        //observer.error('errr');
        observer.complete();
    }).retry(2);
    subscribeTest(observable);
}
/**
 * Тоже что и интервал, только задает стартовую отсрочку запуска испусканий последовательности
 * */
function timerTest() {
    const observable = timer_1.timer(1000, 100);
    subscribeTest(observable);
}
/**
 * Группирует значение испускаемые обсерваблем 1 и исупускает их массив при эмите второго обсерваля*/
function bufferTest() {
    const observable1 = interval_1.interval(100);
    const observable2 = interval_1.interval(1000);
    subscribeTest(observable1.buffer(observable2));
}
/**
 * Делает буфер по количеству элементов
 * второй параметр - сдвиг счетчика элементов
 * */
function bufferCountTest() {
    const observable = from_1.from([1, 2, 3, 4, 5, 6, 7]);
    const buffered = observable.pipe(operators_1.bufferCount(3, 1));
    subscribeTest(buffered);
}
/**
 * Функция сброса буффера генерится через фабрику, для каждой группы будет новая
 * */
function bufferWhenTest() {
    var observable = Observable_1.Observable.interval(100);
    var buffered = observable.pipe(operators_1.bufferWhen(() => {
        return Observable_1.Observable.create((observer) => {
            setTimeout(() => {
                //observer.next(1);
                observer.complete();
            }, 1000);
        });
    }));
    buffered.subscribe(x => console.log(x));
}
/**Игнорит новые испускания родительского обзервабля, до тех пор пока не закомплититься дочерний*/
function exhaustMapTest() {
    let observable1 = interval_1.interval(6000).pipe(operators_1.take(2));
    let observable2 = observable1.exhaustMap((ev) => interval_1.interval(1000).pipe(operators_1.take(4)));
    observable2.subscribe(x => console.log(x));
}
/**
 * Переходит к следующему внешнему испусканию, только если испускание внутренних завершено.
 * */
function concatMapTestToTest() {
    let observable1 = of_1.of(2, 3);
    let observable2 = observable1.concatMapTo(interval_1.interval(1000).take(4));
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
    const observable = of_1.of(2, 3);
    const result = observable.pipe(operators_1.concatMap((x) => {
        console.log(`x = ${x}`);
        return of_1.of(2, 2);
    }, (x, y, ix, iy) => x * y));
    subscribeTest(result);
}
function testScheduler() {
    let o2 = of_1.of(1, 2, 3);
    let o = o2.observeOn(Rx_1.Scheduler.async);
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
    };
    o.subscribe(observer);
}
/***/
function testObservable2() {
    let o = Observable_1.Observable.create((observer) => {
        observer.next(1);
    });
    o
        .map((result) => {
        return result + result;
    })
        .switchMap((result) => {
        let o2 = Observable_1.Observable.create((observer) => {
            observer.next({ 'q': result, 'w': 1 });
        });
        return o2;
    })
        .subscribe((result) => {
        console.log('result = ');
        console.log(result);
    });
}
function testBehaviorSubject() {
    // Сохранять последнй эмит
    let bs = new BehaviorSubject_1.BehaviorSubject(0);
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
        });
    }, 200);
    bs.next(3);
    bs.complete();
}
function testMulticast() {
    let subject = new Subject_1.Subject();
    let observable = Observable_1.Observable.create((observer) => {
        observer.next(1);
    });
    // По сути субъект, в который при вызове connect испускатель генерит значения
    let multicast = observable.multicast(subject);
    // Подписки на  субъект
    multicast.subscribe((result) => {
        console.log(`1 = ${result}`);
    });
    setTimeout(() => {
        multicast.subscribe((result) => {
            console.log(`2 = ${result}`);
        });
    }, 100);
    // Испустить в субъект значения
    multicast.connect();
    // Аналог observable.subscribe(subject);
}
function testSubject() {
    let subject = new Subject_1.Subject();
    subject.subscribe((v) => console.log(`observer A: ${v}`), (error) => console.log(`Ошибка А: ${error}`), () => console.log(`Завершено А`));
    setTimeout(() => {
        subject.subscribe((v) => console.log(`observer B: ${v}`), (error) => console.log(`Ошибка B: ${error}`), () => console.log(`Завершено B`));
    }, 100);
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
let o = Observable_1.Observable.create((observer) => {
    observer.next(11);
});
/**
 * Делаем источник из функции генератора значений
 * каждый subscribe - запускает генерацию значений в функции
 * */
function testObservable() {
    let i = 1;
    let observableFromFunc = Observable_1.Observable.create((observer) => {
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
    });
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
        }, (error) => {
            console.log(`observableFromFunc2 error = ${error}`);
        }, () => {
            console.log(`observableFromFunc2 complete`);
        });
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
    let observable = fromEvent_1.fromEvent(ee, 'event');
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
function subscribeTest(observable) {
    observable.subscribe((result) => {
        console.log(result);
    }, (error) => {
        console.log('err=' + error);
    }, () => {
        console.log('compete');
    });
}
