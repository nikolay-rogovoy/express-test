var async = require("async");

(function main() {
  console.log('start');

  // Пар. вызов функций
  //testParallel();

  // Последовательный возов функций
  // testSeries();

  // Тест вызова для каждого элемента
  //testForEach(1);

  // Тест конкатинации результатов, чем отличается от map - гарантирует последовательность возврата
  // testConcat();

  // Тест - проверка возврата всех функций
  //testEvery();

  // Тест фиьтра, возвращает массив входящих параметров, для которых функция колбэка вернула true
  // testFilter();

  // Обратно фильтру
  // testReject();

  // Группирует входящие параметры по результату параметра { true: [ 1, 3 ], false: [ 2, 4 ] }
  // testGroupBy();

  // Возвращает коллекцию возвратов колбэков, без гарантии что последовательность возврата соответствует очередности вызова
  // mapValues - тоже самое, только мапит свойства объекта
  // testMap();

  // мммм пока не понял
  // testReduce();

  // Дожидается первого правильного возврата, и сразу генерит колбэк.
  // testSome();

  // Сортирует параметры по порядку их выполнени, и возвращает отсортированный масиив
  // testSortBy();

  //testApplyEach();

  // Вызвать асинхронно масив функций с одинаковыми параметрами
  // testApplyEach();

  // Сделать композитную функцию из нескольких функций (функция вызвает другую функцию)
  // testCompose();

  // Запускать на выполнение асинхронную функцию, пока не сделается услови проверки тестовой асихронной функции
  // testDuring();

  // Функция запускает саму себя
  // testForever();

  // Тест очереди задач
  // testPriorityQueue();

  // Вызываем пачку асинхронных функций, финальный колбэк вызовется после заверщения самой быстрой функции
  // testRace();

  // Вызвать асинхронно функцию до тех пор, пока она не вернет колбэк без ошибки, с ограничением кол-ва попыток
  // и с таймером на повторный вызов
  // testRetry();

  // Тоже что и retry - только возвращает ссылку на функцию, выполняющуюся до ...
  // testRetryable();

  // Тоже что и композит, только функции вызываются в другом порядке (более естественно для чтения)
  // testSeq();

  // Вызывает n раз функцию асинхронно, результат аккомулирует и возвращает в колбэк (массивом)
  // timesLimit - лимит на асинхронность
  // timesSeries - вызывает последовательно функции
  // testTimes();

  // Запускать функции последовательно до тех пор, пока какая-нить из них не вернет колбэк без ошибки
  // testTryEach();

  // подобно during - только тестовая функция - синхронная
  // testUntil();

  // Последовательно вызывает методы, передавая возврат первой функции, как входящие параметры следующей функции
  // testWaterfall();

  // Вызывает асинхронную функцию до тех пор пока тест возвращает true
  // Финальный колбэк возвращает последний результат
  // testWhilst();

  // apply
  // async.apply(f1, 1),// Тоже что и 2
  // (callback) => {f1(2, callback)}

  // Сделать синхронный вызов асинхронным, возврат функции будет помещен в колбэк
  // async.asyncify(()=>{return 1}),
  // (callback) => {res = someSyncFunc(), callback(res)};

  // async.constant(1, 2) - Возвращает колбэк вот так: callback(null, 1, 2);
  // Полезна как точка входа в водопад

  // Логирует возврат колбэка, тоже что и async.dir по сути
  // async.dir((par, callback) => { callback(null, {'par': par}) }, 'world');

  //
  // testNextTick();

  // var async.timeout - установить таймаут на работу асинхронной функции



  // reflect(fn) - Обернуть асинхронную функцию другой функцией, в колбэке объект с двумя свойтвами: error или value.

  console.log('end');

})();

function testNextTick() {
  var call_order = [];
  async.nextTick(function() {
    call_order.push('two');
  });
  call_order.push('one');

  async.setImmediate(function (a, b, c) {
    // a, b, and c equal 1, 2, and 3
  }, 1, 2, 3);
}

function testWhilst() {
  let count = 0;
  async.whilst(
    () => { return count < 3; },
    (callback) => {
      count++;
      f1(count, callback);
    },
    function (error, results) {
      if(error) {
        console.log('end error = ' + error);
        // Ура все получилось
      }
      else {
        console.log('end results = ' + results);
      }
    }
  );
}

function testWaterfall() {
  async.waterfall([
      async.constant(1),
      (i, callback) => { f1(i, callback) },
      (i, callback) => { f1(i, callback) }
    ],
    function (error, results) {
      if(error) {
        console.log('end error = ' + error);
        // Ура все получилось
      }
      else {
        console.log('end results = ' + results);
      }
    }
  );
}

function testUntil() {

  var count = 0;

  async.until(
    // Синхронная функция тестирования
    function () {
      console.log('f1');
      return count > 5;
    },
    function (callback) {
      console.log('f2');
      count++;
      // Рабочая функция, асинхронная: callback(error, results)
      setTimeout(() => {callback(null, count)}, 1000);
    },
    function (error, results) {
      if(error) {
        console.log('end error = ' + error);
        // Ура все получилось
      }
      else {
        console.log('end results = ' + results);
      }
    }
  );

}

function testTryEach() {
  async.tryEach([
    (callback) => { f1(2, callback) },
    (callback) => { f1(1, callback) }
    ], (error, result) => {
      if (error) {
        console.log('error = ' + error);
      }
      else {
        console.log('result = ' + result);
      }
    }
  );

}

function testTimes() {
  async.times(4, (n, next) => {
      console.log('n = ' + n);
      f1(n, next);
    }, (error, result) => {
      if (error) {
        console.log('error = ' + error);
      }
      else {
        console.log('result = ' + result);
        console.log(result);
      }
    }
  );
}

function testSeq() {

  var f_new = async.seq(f1, f1_d);
  f_new(1, function (err, result) {
    console.log(result);
  });
}


function testRetryable() {
  let v = async.retryable({
      times: 3,
      interval: 500
    },
    (callback) => {
      console.log('qqq');
      callback('error', true);
    }
  );

  v(
    (error, result) => {
      if(error) {
        console.log('error = ' + error);
      }
      else {
        console.log('result = ' + result);
      }
    }
  );
}

function testRetry() {
  async.retry({
    times: 3,
    interval: 500
  },
    (callback) => {
      console.log('qqq');
      callback('error', true);
    },
    (error, result) => {
    if(error) {
      console.log('error = ' + error);
    }
    else {
      console.log('result = ' + result);
    }
  });
}


function testRace() {
  async.race(
    [
      async.apply(f1, 1),// Тоже что и 2
      (callback) => {f1(2, callback)}
    ],
    (error, result) => {
      console.log(result);
    }
  );
}

function testPriorityQueue() {

  let q = async.priorityQueue(function (task, callback) {
    // Воркер, берет объект и вызывает колбэк
    console.log('hello ' + task.name);
    callback();
  }, 20);

  // Очередь пуста
  q.drain = function() {
    console.log('all items have been processed');
  }

  // Объет для обработки, колбэк при завершении обработки
  q.push({name: 'foo'}, 1, function (err) {
    console.log('finished processing foo');
  });
  q.push({name: 'bar'}, 2, function (err) {
    console.log('finished processing bar');
  });

  q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], 3, function (err) {
    console.log('finished processing item');
  });

  setTimeout(() => {
      q.push({name: 'timer'}, 4, function (err) {
        console.log('finished processing item');
      });
    },
    1000);

}

function testForever() {
  async.forever(
    function(next) {
      console.log('qwe');
      setTimeout(()=>{next();}, 500);
    },
    function(err) {
      console.log('err = ' + err);
    }
  );
}

function testDuring() {
  var count = 0;

  async.during(
    function (callback) {
      console.log('f1');
      callback(null, count < 5);
    },
    function (callback) {
      console.log('f2');
      count++;
      setTimeout(callback, 1000);
    },
    function (err) {
      console.log('end err = ' + err);
      // Ура все получилось
    }
  );
}

function testCompose() {

  var f_new = async.compose(f1, f1_d);
  f_new(1, function (err, result) {
    console.log(result);
  });
}

function testApplyEach() {
  async.applyEach([f1_1, f2_1], 2, 3, (err) => {console.log('ok')} );
}


function testSortBy() {
  async.sortBy([3, 2, 1, 4], f1, (err, result) => {
    console.log(result);
});
}

function testReduce() {
  async.reduce([1, 2, 3], 0, (memo, item, callback) => {
    // pointless async:
    process.nextTick(function() {
      callback(null, memo + item)
    });
  }, function(err, result) {
    console.log(result);
  });
}

function testSome() {
  async.some([2, 4, 5, 6], f2, (err, result) => {
    console.log(result);
  });
}


function testMap() {
  async.map([1, 4, 3, 2], f1, (err, result) => {
    console.log(result);
});
}

function testGroupBy() {
  async.groupBy([1, 2, 3, 4], f2, (err, result) => {
    console.log(result);
});
}

function testFilter() {
  async.filter([2, 3, 4, 5], f2, (err, result) => {
    console.log(result);
  });
}

function testReject() {
  async.reject([2, 3, 4, 5], f2, (err, result) => {
    console.log(result);
});
}


function testEvery() {
  async.every([1, 2, 3], f1, (err, result) => {
    // Если где-то не ок, то сразу генерится общий колбэк
    if (result) {
      console.log('Все ок');
    }
    else {
      console.log('Где-то не ок');
    }
  });
}

function testConcat(limit) {

  if(limit) {
    if(limit == 1) {
      async.concatSeries([1, 4, 3, 2], f1, function (err, result) {
        console.log('testConcat');
        console.log(result);
      });
    }
    else {
      async.concatLimit([1, 4, 3, 2], limit, f1, function (err, result) {
        console.log('testConcat');
        console.log(result);
      });
    }
  }
  else {
    async.concat([1, 4, 3, 2], f1, function (err, result) {
      console.log('testConcat');
      console.log(result);
    });
  }
}

function testParallel() {
  // Параллельный вызов функций
  async.parallel([
    function(callback) {
      f(1, callback);
    },
    function(callback) {
      f(2, callback);
    },
  ], function(err) {
    // Все функции отработали
    console.log('Все функции отработали err = ' + err);
    // Если одна из функций вернет err, то вызовется финальный колбэк без ожидания завершения остальных функций
  });
}

function testForEach(limit) {

  let arr = [1, 2, 3, 4];

  if(limit) {
    if(limit == 1) {
      async.forEachSeries(arr, f, function (err) {
        // Все функции отработали
        console.log('Все функции отработали err = ' + err);
        // Если одна из функций вернет err, то вызовется финальный колбэк без ожидания завершения остальных функций
      });
    }
    else {
      async.forEachLimit(arr, limit, f, function (err) {
        // Если одна из функций вернет err, то вызовется финальный колбэк без ожидания завершения остальных функций
        if (err) {
          console.log('Все функции отработали err = ' + err);
        }
        else {
          // Все функции отработали
          console.log('Все функции отработали');
        }
      });
    }
  }
  else {
    async.forEach(arr, f, function (err) {
      // Все функции отработали
      console.log('Все функции отработали err = ' + err);
      // Если одна из функций вернет err, то вызовется финальный колбэк без ожидания завершения остальных функций
    });
  }
}

function testSeries() {
  // Параллельный вызов функций
  async.series([
    function(callback) {
      f(1, callback);
    },
    function(callback) {
      f(2, callback);
    },
  ], function(err) {
    // Все функции отработали
    console.log('Все функции отработали err = ' + err);
    // Если одна из функций вернет err, то вызовется финальный колбэк без ожидания завершения остальных функций
  });
}

/**Тест функция*/
function f(i, callback) {
  setTimeout(
    () => {
      console.log(i);
      callback(null);
      //callback('error');
    },
    i * 500);
}

/**Тест функция с возвратом значения*/
function f1(i, callback) {
  setTimeout(
    () => {
    console.log('f1 i = ' + i);
  callback(null, i * 10);
  //callback('error');
},
  i * 500);
}

/**Тест функция с возвратом значения*/
function f1_d(i, callback) {
  setTimeout(
    () => {
    console.log('f1_d i = ' + i);
  callback(null, i * 10);
  //callback('error');
},
  i * 500);
}


/**Тест функция с возвратом була*/
function f2(i, callback) {
  setTimeout(
    () => {
    console.log(i);
  callback(null, i % 2 == 1);
},
  i * 500);
}


/**Тест функция с возвратом значения*/
function f1_1(i, j, callback) {
  setTimeout(
    () => {
    console.log(i);
    callback(null, i % 2 == 1);
  },
  i * 500);
}

/**Тест функция с возвратом значения*/
function f2_1(i, j, callback) {
  setTimeout(
    () => {
    console.log(i);
    callback(null, i % 2 == 1);
  },
  i * 500);
}
