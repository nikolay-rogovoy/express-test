"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fromPromise_1 = require("rxjs/observable/fromPromise");
var logger = require("./logger.js");
class LibPg {
    connect() {
        var self = this;
        var config = {
            user: 'postgres',
            database: 'wd-online',
            password: 'PPKTH8pN9uYSFY#',
            host: 'localhost',
            port: 3007,
            max: 500,
            MaxConnections: 500,
            idleTimeoutMillis: 30000,
        };
        var pool = new pg_1.Pool(config);
        pool.on('error', function (err, client) {
            // if an error is encountered by a client while it sits idle in the pool
            // the pool itself will emit an error event with both the error and
            // the client which emitted the original error
            // this is a rare occurrence but can happen if there is a network partition
            // between your application and the database, the database restarts, etc.
            // and so you might want to handle it and at least log it out
            logger.error("idle client error", err.message, err.stack);
        });
        return pool;
    }
}
exports.LibPg = LibPg;
(function main() {
    logger.debug(`libPG main -> start`);
    let libPg = new LibPg();
    let pool = libPg.connect();
    let entityName = 'customer';
    let entityKey = 25;
    let query = `
SELECT
  ec.identity,
  ec.name,
  ec.comment,
  es.child_column_name,
  ecol.name as col_name
from entity e
  join entityschema es on e.name = es.parent_table_name
  join entity ec on es.child_table_name = ec.name and es.child_column_name <> 'idcustomerkey'
                    and not exists(select * from get_parent_entity_form(ec.name, 0) f where f.name = e.name)
  -- Эти сущности удаляются каскадно
  left join entitycolumn ecol on  ec.identity = ecol.identity and ecol.name = 'name'
where e.name = $1;
`;
    fromPromise_1.fromPromise(pool.query(query, [entityName]))
        .subscribe((result) => {
        logger.debug(result.rows);
        let querySlaveEntity = '';
        for (let row of result.rows) {
            //logger.debug(row);
            querySlaveEntity = querySlaveEntity + `select id${row.name} as key, '${row.name}' as entity_name, '${row.comment}' as entity_comment, ${row.col_name == null ? "null" : row.col_name + '::text'} as name_entity from ${row.name} where ${row.child_column_name} = ${entityKey}
union all
`;
        }
        querySlaveEntity = querySlaveEntity.replace(/union all\n$/m, ';');
        //logger.debug(querySlaveEntity);
        // Выполнить полученный запрос
        if (querySlaveEntity != '') {
            fromPromise_1.fromPromise(pool.query(querySlaveEntity))
                .subscribe((result) => {
                logger.debug(result.rows);
            });
        }
    });
})();
