// helper for database access    

const config = require("../config");
const mssqlConnectionConfig = config.mssqlConnectionConfig;

const mssql = require('mssql/msnodesqlv8');


const dbPool = new mssql.ConnectionPool(mssqlConnectionConfig)
dbPool.on('error', err => {
    console.log("Connection Pool Error: " + err)
});
const dbConnection = dbPool.connect()

// early warning of connection issues, but continue as problems might be transitory
dbConnection.then(
    () => console.log("connected")
).catch(e => console.log("Initial connection error, will retry. Error:  " + e));


// parameter object has attributes corresponding to named parameters in queryString
function executeSql(queryString, parameters) {
    return dbConnection.then(
        (pool) => {
            let request = pool.request();

            if (parameters) {
                Object.keys(parameters).forEach(
                    k => request = request.input(k, parameters[k])
                );
            }

            return request.query(queryString);
        }
    );
}

function beginTransaction() {
    return dbConnection.then((pool) => {
        const transaction = new mssql.Transaction(pool);
        return transaction.begin();
    });
}

function executeSqlInTransaction(transaction, queryString, parameters) {

    let request = new mssql.Request(transaction);

    if (parameters) {
        Object.keys(parameters).forEach(
            k => request = request.input(k, parameters[k])
        );
    }

    return request.query(queryString);
}

module.exports = {
    "executeSql": executeSql,
    "beginTransaction": beginTransaction,
    "executeSqlInTransaction": executeSqlInTransaction
};