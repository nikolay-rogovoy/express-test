var http = require('http');

function main() {
}

/**Запрос к нашему бэк энду*/
main.prototype.getHttp = function(path, propName) {
    let promise = new Promise(function (resolve, reject) {
        // Получить сущность
        let options = {
            hostname: 'localhost',
            //hostname: 'powercad.ru',
            port: 3003,
            //port: 80,
            path: path,
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': 'Bearer<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteV9pc3N1cmVyIiwiYXVkIjoiV29ybGQiLCJpYXQiOjE0MDAwNjI0MDAyMjMsInR5cCI6Ii9vbmxpbmUvdHJhbnNhY3Rpb25zdGF0dXMvdjIiLCJ1c2VyIjp7ImlkY3VzdG9tZXIiOjIsImlkY3VzdG9tZXJrZXkiOjEsImN1c3RvbWVyX25hbWUiOiLQoNC-0LPQvtCy0L7QuSDQndC40LrQvtC70LDQuSDQndC40LrQvtC70LDQtdCy0LjRhyJ9fQ.fCmVgjTvcvGPNqUn9UHb8Y_3VgQRJpTpQ13LWoeHS74>'
            },
            agent: false  // create a new agent just for this one request
        };

        http.get(options, (res) => {
            // res - http.IncomingMessage
            const {statusCode} = res;
            // Тип ответа
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Ошибка запроса Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Не правильный content-type. Ожидается application/json получен: ${contentType}`);
            }
            if (error) {
                res.resume();
                reject(error);
                return;
            }

            // Извлекаем данные
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    let parsedData = JSON.parse(rawData);
                    let data;
                    if (propName == null) {
                        data = parsedData;
                    }
                    else {
                        data = parsedData[propName];
                    }

                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });

    return promise;
}

module.exports = new main();
