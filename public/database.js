const debug = require('debug')('db');

module.exports = function () {

    return {
        development: {
            url:"postgres://BiAMa:1234@localhost/BiAMaDB",
            pg: require('pg'),
            options: {
                logging:debug,
                pool: {
                    maxIdleTime:30,
                    maxConnections:50
                }
            }
        },
        test: {

        }, 
        staging: {

        },
        production: {
            url: process.env.DATABASE_URL,
            pg: require('pg'),
            options: {
                logging: debug,
                pool: {
                    maxIdleTime:30,
                    maxConnections:50
                }
            }
        }
    }[process.env.NODE_ENV || 'development'];

};