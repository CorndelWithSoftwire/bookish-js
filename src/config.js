
const config = {  
    mssqlConnectionConfig : {
        user: 'sa',
        password: 'DaveDockedSoftwire2021',
        server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
        database: 'bookish',
        options: {
            "enableArithAbort": true
        }
    },
    secret : 'bookish-secret'
};

module.export = config

