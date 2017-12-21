var http = require('http');
var logger = require("../logger.js");

class Lib {

    extractResponse(res, resolve, reject) {
        // res - http.IncomingMessage
        const {statusCode} = res;
        // Тип ответа
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error(`Ошибка запроса Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Неправильный content-type. Ожидается application/json получен: ${contentType}`);
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
                resolve(parsedData);
            } catch (e) {
                reject(e);
            }
        });
    }

    /***/
    getOption(method, path) {
        let options = {
            hostname: 'localhost',
            port: 3003,
            method: method,
            path: path,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteV9pc3N1cmVyIiwiYXVkIjoiV29ybGQiLCJpYXQiOjE0MDAwNjI0MDAyMjMsInR5cCI6Ii9vbmxpbmUvdHJhbnNhY3Rpb25zdGF0dXMvdjIiLCJ1c2VyIjp7ImlkY3VzdG9tZXIiOjIsImlkY3VzdG9tZXJrZXkiOjEsImN1c3RvbWVyX25hbWUiOiLQoNC-0LPQvtCy0L7QuSDQndC40LrQvtC70LDQuSDQndC40LrQvtC70LDQtdCy0LjRhyJ9fQ.fCmVgjTvcvGPNqUn9UHb8Y_3VgQRJpTpQ13LWoeHS74>'
            },
            agent: false  // create a new agent just for this one request
        };
        return options;
    }

    getHttp (path) {
        let promise = new Promise((resolve, reject) => {
            let options = this.getOption('GET', path);

            logger.debug(`getHttp -> ${path}`);

            http.get(options, (res) => this.extractResponse(res, resolve, reject)).on('error', (error) => {
                reject(error);
            });
        });

        return promise;
    }

    /**Запрос к нашему бэк энду*/
    deleteHttp (path) {
        let promise = new Promise((resolve, reject) => {
            let options = this.getOption('DELETE', path);

            const req = http.request(options, (res) => this.extractResponse(res, resolve, reject)).on('error', (error) => {
                reject(error);
            });
            req.end();
        });

        return promise;
    }

    /**Запрос к нашему бэк энду*/
    postHttp (path, postData) {
        let promise = new Promise((resolve, reject) => {
            let options = this.getOption('POST', path);

            const req = http.request(options, (res) => this.extractResponse(res, resolve, reject)).on('error', (error) => {
                reject(error);
            });

            // write data to request body
            req.write(postData);
            req.end();
        });

        return promise;
    }
}

module.exports = new Lib();
