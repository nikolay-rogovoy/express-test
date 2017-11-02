(function main() {
    console.log('start');
    let dataSource = new Object();
    dataSource['data'] = {
        "data": [
            {
                "idorderdoc": 10,
                "name": "В-22",
                "comment": null,
                "dtdoc": "2017-04-20",
                "dtcre": "2017-04-11T10:11:03",
                "idcustomer": 4,
                "smdoc": 123456.1,
                "smdocmy": null,
                "smdiscount": null,
                "smdiscountmy": null,
                "floor": null,
                "contact": null,
                "address": null,
                "idorderdoctype": 2,
                "idcustomerkey": 4,
                "customer_name": "Василий Пупкин",
                "customerkey_name": "Василий Пупкин",
                "orderdoctype_name": "Предварительный расчет",
                "orderdocsignvalues": [],
                "orderdocitems": [
                    {
                        "idorderdocitem": 6,
                        "numpos": 1,
                        "name": "Позиция 1",
                        "comment": "Commm 1",
                        "smpos": 12321.12,
                        "smposmy": null,
                        "smdiscount": null,
                        "smdiscountmy": null,
                        "width": null,
                        "height": null,
                        "lenght": null,
                        "weight": null,
                        "pricepos": null,
                        "qupos": null,
                        "idorderdoc": 10,
                        "idgood": null,
                        "good_name": null,
                        "orderdoc_name": "В-22",
                        "orderdocmodels": [],
                    },
                    {
                        "idorderdocitem": 7,
                        "numpos": 2,
                        "name": "Позиция 2",
                        "comment": "Commm 2",
                        "smpos": 321.21,
                        "smposmy": null,
                        "smdiscount": null,
                        "smdiscountmy": null,
                        "width": null,
                        "height": null,
                        "lenght": null,
                        "weight": null,
                        "pricepos": null,
                        "qupos": null,
                        "idorderdoc": 10,
                        "idgood": null,
                        "good_name": null,
                        "orderdoc_name": "В-22",
                        "orderdocmodels": [],
                    }
                ]
            }
        ]
    };
    let s = `
Начало отчета
{{data.loop}}
data.name = {{data.name}}
drcre1 = {{data.dtcre|date}}
drcre2 = {{data.dtcre}}
drcre3 = {{data.dtcredate}}
smdoc = {{data.smdoc}}
smdoc = {{data.smdoc|number}}
smdoc = {{data.smdoc|currency}}
Начало позиций
  {{orderdocitems.loop}}
  orderdocitems.name = {{orderdocitems.name}}
  {{orderdocitems.endloop}}
Конец позиций  
{{data.endloop}}

Еще отчет
{{data.loop}}
data.custome_name = {{data.customer_name}}
Начало позиций
  {{orderdocitems.loop}}
  orderdocitems.numpos = {{orderdocitems.numpos}}
  {{orderdocitems.endloop}}
Конец позиций  
{{data.endloop}}

Конец отчета
`;
    //console.log(dataSource['data']['data']);
    let result = renderReport('data', s, dataSource['data']['data']);
    console.log('result = ');
    console.log(result);
    //console.log('Завтрак в 09:00.'.match(/\d\d:\d\d/);
})();
/**Генерация отчета*/
function renderReport(dataSourceName, pattern, dataSource) {
    let result = pattern;
    // console.log(`iterate start ${dataSourceName} \n result=\n${result}`);
    // Ищем дата сурс в шаблоне
    let regExpStr = `{{${dataSourceName}\\.loop}}[\\s\\w\\W]*?{{${dataSourceName}\\.endloop}}`;
    // console.log(`regExpStr = ${regExpStr}`);
    let regExp = new RegExp(regExpStr, 'gm');
    if (dataSource != null && dataSource.length > 0) {
        // Есть записи, ищем шаблон
        let regExpResult = pattern.match(regExp);
        // Если в шаблоне есть итератор для сущности
        if (regExpResult != null && regExpResult.length > 0) {
            // Шаблон для сущности
            for (let iterateItem of pattern.match(regExp)) {
                // Убираем из шаблона указатели на источник данных
                let iterateItemClear = iterateItem.replace(new RegExp(`^{{${dataSourceName}\\.loop}}`, 'gm'), '');
                iterateItemClear = iterateItemClear.replace(new RegExp(`{{${dataSourceName}\\.endloop}}$`, 'gm'), '');
                // console.log(iterateItemClear);
                // Из шаблона генерим пачку шаблонов
                let newDataArr = '';
                for (let obj of dataSource) {
                    let newData = iterateItemClear;
                    // Провести интерполяцию :)
                    for (let prop in obj) {
                        if (Array.isArray(obj[prop])) {
                            // Рекурсия дальше
                            newData = renderReport(prop, newData, obj[prop]);
                        }
                        else {
                            let valuetToReplace = obj[prop];
                            if (valuetToReplace == null) {
                                valuetToReplace = '';
                            }
                            // Регулярное выражение поиска полей интерполяции
                            let refExpValue = new RegExp(`{{${dataSourceName}\\.${prop}(\\|date)?(\\|number)?(\\|currency)?}}`, 'g');
                            let dataSourceValue = pattern.match(refExpValue);
                            if (dataSourceValue != null) {
                                // Меняем в шаблоне
                                for (let iterateItemValue of dataSourceValue) {
                                    let valuetToReplaceFormat = valuetToReplace;
                                    if (iterateItemValue.includes('|date')) {
                                        let dt = new Date(valuetToReplace);
                                        valuetToReplaceFormat = formatApp(dt);
                                    }
                                    else if (iterateItemValue.includes('|number')) {
                                        let num = +valuetToReplace;
                                        //let language = window.navigator.userLanguage || window.navigator.language;
                                        valuetToReplaceFormat = num.toLocaleString('ru-RU');
                                    }
                                    else if (iterateItemValue.includes('|currency')) {
                                        let num = +valuetToReplace;
                                        //let language = window.navigator.userLanguage || window.navigator.language;
                                        valuetToReplaceFormat = num.toLocaleString('ru-RU', { 'minimumFractionDigits': 2 });
                                    }
                                    //console.log(`iterateItemValue : ${iterateItemValue}; valuetToReplaceFormat : ${valuetToReplaceFormat}; newData : ${newData}`);
                                    newData = newData.replace(iterateItemValue, valuetToReplaceFormat);
                                    //console.log(`newData : ${newData}`);
                                }
                            }
                            // console.log(`prop : ${prop} = ${obj[prop]}`);
                        }
                    }
                    newDataArr += newData;
                } // Обходим сущности
                // Заменяем в шаблоне
                result = result.replace(new RegExp(regExpStr, 'm'), newDataArr);
            } // Обходим шаблоны
        } // Нет шаблона
    }
    else {
        // Нет записей для сущности - генерить нечего
        result = pattern.replace(regExp, '');
    }
    // console.log(`iterate end ${dataSourceName}`);
    return result;
}
function formatApp(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear()
    ].join('.');
}
;
/*
function renderReport(dataSourceName: string, pattern: string, dataSource: []) {
  let result = pattern;
  // console.log(`iterate start ${dataSourceName} \n result=\n${result}`);

  // Ищем дата сурс в шаблоне
  let regExpStr = `{{${dataSourceName}\\.loop}}[\\s\\w\\W]*?{{${dataSourceName}\\.endloop}}`;
  // console.log(`regExpStr = ${regExpStr}`);
  let regExp = new RegExp(regExpStr, 'gm');
  if(dataSource != null && dataSource.length > 0) {
    // Есть записи, ищем шаблон
    let regExpResult = pattern.match(regExp);
    // Если в шаблоне есть итератор для сущности
    if (regExpResult != null && regExpResult.length > 0) {
      // Шаблон для сущности
      for (let iterateItem of pattern.match(regExp)) {
        // Убираем из шаблона указатели на источник данных
        let iterateItemClear = iterateItem.replace(new RegExp(`^{{${dataSourceName}\\.loop}}`, 'gm'), '');
        iterateItemClear = iterateItemClear.replace(new RegExp(`{{${dataSourceName}\\.endloop}}$`, 'gm'), '');
        // console.log(iterateItemClear);
        // Из шаблона генерим пачку шаблонов
        let newDataArr = '';
        for (let obj of dataSource) {
          let newData = iterateItemClear;
          // Провести интерполяцию :)
          for (let prop in obj) {
            if (Array.isArray(obj[prop])) {
              // Рекурсия дальше
              newData = renderReport(prop, newData, obj[prop]);
            }
            else {
              newData = newData.replace(
                new RegExp(`{{${dataSourceName}\\.${prop}}}`, 'gm'), obj[prop]);
              // console.log(`prop : ${prop} = ${obj[prop]}`);
            }
          }
          newDataArr += newData;
        }// Обходим сущности
        // Заменяем в шаблоне
        result = result.replace(new RegExp(regExpStr, 'm'), newDataArr);
      }// Обходим шаблоны
    }// Нет шаблона
  } else {
    // Нет записей для сущности - генерить нечего
    result = pattern.replace(regExp, '');
  }
  // console.log(`iterate end ${dataSourceName}`);
  return result;
}

*/ 
