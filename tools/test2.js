let pattern = `
<p><strong>Эффективность рекламных источников</strong>
	<br>за период с {{@dtstart|date}} по {{@dtend|date}}</p>
<p>Распечатал: {{@customer_name}}</p>

<table>
	<tbody>
		<tr>
			<td>Источник</td>
			<td><strong>Офис</strong></td>
			<td>Количество обращений</td>
			<td>Количество замеров</td>
			<td>Количество договоров</td>
			<td>Сумма договоров</td>
			<td>Сумма платежей за рекламу по источнику</td>
			<td>Эффективность источника, руб</td>
		</tr>

{{Рг=groupBy(Рекламные источники,['dtdoc', 'appealsource_name'])}}
{{Рг.loop}}
	{{Pr.value|date}}
	{{appealsource_name.loop}}
		{{appealsource_name.value}}
		<tr>
			<td>{{appealsource_name.appealsource_name}}
				<br>
			</td>
			<td>{{Рекламные источники.customerdepartment.name}}
				<br>
			</td>
			<td>{{Рекламные источники.appeal_count}}
				<br>
			</td>
			<td>{{Рекламные источники.sizedoc_count}}
				<br>
			</td>
			<td>{{Рекламные источники.qu_agreement}}
				<br>
			</td>
			<td>{{Рекламные источники.agreement_smdocwithdiscount}}
				<br>
			</td>
			<td>
				<br>
			</td>
			<td>
				<br>
			</td>
		</tr>
	{{appealsource_name.endloop}}
{{Pr.endloop}}

		<tr>
			<td></td>
			<td></td>
			<td>{{sum(Pr.appeal_count)}}</td>
			<td>{{sum(Pr.sizedoc_count)}}</td>
			<td>{{sum(Pr.qu_agreement)}}</td>
			<td>{{sum(Pr.agreement_smdocwithdiscount)}}</td>
			<td></td>
			<td></td>
		</tr>

	</tbody>
</table>

<p>
	<br>
</p>

<table>
	<tbody>
		<tr>
			<td>Источник</td>
			<td><strong>Сотрудник</strong></td>
			<td>Количество обращений</td>
			<td>Количество замеров</td>
			<td>Количество договоров</td>
			<td>Сумма договоров</td>
			<td>Сумма платежей за рекламу по источнику</td>
			<td>Эффективность источника, руб</td>
		</tr>
		<tr>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}
				<br>
			</td>
			<td>{a}</td>
		</tr>
	</tbody>
</table>

`;

let dataSourceData = [
    {
        "dtdoc": "2018-05-18T05:44:27.000Z",
        "appeal_count": 1,
        "sizedoc_count": 0,
        "orderdoc_count": 0,
        "qu_agreement": 0,
        "agreement_smdocwithdiscount": 0,
        "customerdepartment": null,
        "appealsource": {
            "name": "Интернет Входящий звонок "
        }
    },
    {
        "dtdoc": "2018-06-16T13:45:44.000Z",
        "appeal_count": 1,
        "sizedoc_count": 0,
        "orderdoc_count": 0,
        "qu_agreement": 0,
        "agreement_smdocwithdiscount": 0,
        "customerdepartment": {
            "name": "Офис № 2 (ГСО)"
        },
        "appealsource": {
            "name": "Основной номер"
        }
    },
    {
        "dtdoc": "2018-06-27T13:49:26.811Z",
        "appeal_count": 1,
        "sizedoc_count": 1,
        "orderdoc_count": 1,
        "qu_agreement": 1,
        "agreement_smdocwithdiscount": 167263,
        "customerdepartment": {
            "name": "Офис № 1 (Краснодар)"
        },
        "appealsource": {
            "name": "Реклама в газете \"Из рук в руки\""
        }
    },
    {
        "dtdoc": "2018-05-23T02:48:22.000Z",
        "appeal_count": 1,
        "sizedoc_count": 0,
        "orderdoc_count": 0,
        "qu_agreement": 0,
        "agreement_smdocwithdiscount": 0,
        "customerdepartment": null,
        "appealsource": {
            "name": "Сайт основной: Перезвоните мне"
        }
    },
    {
        "dtdoc": "2018-06-08T09:36:00.000Z",
        "appeal_count": 1,
        "sizedoc_count": 0,
        "orderdoc_count": 0,
        "qu_agreement": 0,
        "agreement_smdocwithdiscount": 0,
        "customerdepartment": {
            "name": "Офис № 2 (ГСО)"
        },
        "appealsource": {
            "name": "Интернет Входящий звонок "
        }
    }
];

class CommonLib {

    /**Генерация отчета для источников данных*/
    static renderReport(pattern, dataSourceDatas) {
        // Сгруппировать
        CommonLib.createGroupByCollection(renderCanvas, [{dataSourceName: 'Рекламные источники', dataSourceData}]);
        let renderCanvas = pattern;
        for (let dataSourceData of dataSourceDatas) {
            renderCanvas = CommonLib.renderReportRec(dataSourceData.name, renderCanvas, dataSourceData.data);
            renderCanvas = CommonLib.replaceParam(dataSourceData.param, renderCanvas);
        }
        return renderCanvas;
    }

    /**Генерация отчета для одного источника данных*/
    static renderReportRec(dataSourceName, pattern, dataSource) {
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
                    let renderCanvasArr = '';
                    for (let obj of dataSource) {
                        let renderCanvas = iterateItemClear;
                        // Провести интерполяцию :)
                        for (let prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                if (Array.isArray(obj[prop])) {
                                    // Рекурсия дальше
                                    renderCanvas = CommonLib.renderReportRec(prop, renderCanvas, obj[prop]);
                                } else {
                                    let allProps = [prop];
                                    if (obj[prop] != null && typeof obj[prop] === 'object') {
                                        allProps = CommonLib.getLeafPath(obj[prop], prop);
                                    }
                                    for (let propItem of allProps) {
                                        let valuetToReplace = CommonLib.extractDataFromObject(obj, propItem);
                                        if (valuetToReplace == null) {
                                            valuetToReplace = '';
                                        }
                                        // Регулярное выражение поиска полей интерполяции
                                        let fieldName = `${dataSourceName}\\.${propItem}`;
                                        renderCanvas = CommonLib.replaceValueOnRenderCanvas(fieldName, renderCanvas, valuetToReplace);
                                    }
                                }
                            }
                        }
                        // Удалить все не интерполированные поля
                        renderCanvas = renderCanvas.replace(/{{[\s\w\W]+?}}/g, '');
                        renderCanvasArr += renderCanvas;
                    }// Обходим сущности
                    // Заменяем в шаблоне
                    result = result.replace(new RegExp(regExpStr, 'm'), renderCanvasArr);
                }// Обходим шаблоны
            }// Нет шаблона
        } else {
            // Нет записей для сущности - генерить нечего
            result = pattern.replace(regExp, '');
        }
        // console.log(`iterate end ${dataSourceName}`);
        return result;
    }

    static createGroupByCollection(pattern, dataSources) {
        let grouppedDataSource = [];
        for (let groupObject of CommonLib.getGroupByObject(pattern)) {
            let dataSourceName = CommonLib.getDataSourceNameFromGroupObject(groupObject);
            let groupFields = CommonLib.getGroupFieldFromGroupObject(groupObject);
            let newDataSourceName = groupObject[0];
            for (let dataSource of dataSources) {
                if (dataSource.dataSourceName === dataSourceName) {
                    let groupedDataSource = CommonLib.groupByRec(groupFields, dataSource.dataSourceData);
                    grouppedDataSource.push({dataSourceName: newDataSourceName, dataSourceData: groupedDataSource});
                }
            }
        }
        return grouppedDataSource;
    }

    static groupByRec(groupFields, dataSource) {
        let fieldToGroupBy = groupFields.shift();
        let groupedDataSource = CommonLib.groupBy(dataSource, fieldToGroupBy);
        if (groupFields.length) {
            for (let groupItem of groupedDataSource) {
                groupItem.items = CommonLib.groupByRec(groupFields, groupItem.items);
            }
        }
        return groupedDataSource;
    }

    static groupBy(sourceArray, key) {
        let getValue = (val, key) => val[key] ? val[key] : 'Неопределено';
        let groupObject = sourceArray.reduce((acc, val) => {
            (acc[getValue(val, key)] = acc[getValue(val, key)] || []).push(val);
            return acc;
        }, {});
        return Object.keys(groupObject).map(x => {
            return {value: x, items: groupObject[x]}
        });
    }

    /***/
    static getDataSourceNameFromGroupObject(groupObject) {
        return CommonLib.splitGroupObject(groupObject)[0];
    }

    /***/
    static getGroupFieldFromGroupObject(groupObject) {
        let groupField = CommonLib.splitGroupObject(groupObject)[1].split(',')
            .map(x => x.trim().replace(/['"]+/g, ''));
        if (groupField.length === 0) {
            throw new InvalidGroupObjectParams('');
        }
        return groupField;
    }

    /***/
    static splitGroupObject(groupObject) {
        let regExp = /^([\w\sа-яёА-ЯЁ]+),\[([\w\s,а-яёА-ЯЁ'"]+)\]$/g;
        let result = [];
        let regExpResult;
        while (regExpResult = regExp.exec(groupObject[1])) {
            result.push([regExpResult[1], regExpResult[2]]);
        }
        if (result.length !== 1) {
            throw new InvalidGroupObjectParams('');
        }
        return [result[0][0], result[0][1]];
    }

    /***/
    static getGroupByObject(pattern) {
        let regExpGroup = /{{([\wа-яёА-ЯЁ]+)\s*=\s*groupBy[ ]*\(([\w\s,а-яёА-ЯЁ'"[\]]+)\)}}/g;
        let result = [];
        let regExpResult;
        while (regExpResult = regExpGroup.exec(pattern)) {
            result.push([regExpResult[1], regExpResult[2]]);
        }
        return result;
    }

}

/***/
class InvalidGroupObjectParams {
    constructor(message) {
        this.message = message;
    }
}


(() => {

    let renderCanvas = pattern;
    // renderCanvas = renderReportRec('Рекламные источники', renderCanvas, dataSourceData);
    console.log(JSON.stringify(
    CommonLib.createGroupByCollection(renderCanvas, [{dataSourceName: 'Рекламные источники', dataSourceData}])
    ));
    // console.log(renderCanvas);
    // console.log(JSON.stringify(o));
})();
