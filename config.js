/**
 * Copyright (c) 2015 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var cfenvReader = require('./lib/cfenv/reader');
var postgres_credentials = cfenvReader.getServiceCredentials("mypostgres");
var websocket_credentials = cfenvReader.getServiceCredentials('websocket-ups');

var config = {
    postgres: {
        database: postgres_credentials.dbname,
        username: postgres_credentials.username,
        password: postgres_credentials.password,
        options: {
            host: postgres_credentials.hostname,
            port: postgres_credentials.port,
            dialect: 'postgres',
            pool: {
                max: 12,
                min: 0,
                idle: 10000
            }
        }
    },
    "ws": {
        "externalAddress": cfenvReader.getApplicationUri(),
        //Until TAP platform won't supper unsecure websocket connection, we can only use 443 port
        "externalPort": 443,
        "serverAddress": cfenvReader.getHost(),
        "port": cfenvReader.getPort(),
        "username": websocket_credentials.username,
        "password": websocket_credentials.password
    },
    "logger": {
        transport : {
            console: {
                handleExceptions: true,
                json: false,
                colorize: true,
                prettyPrint: false,
                timestamp: true,
                exitOnError: false,
                level: 'debug'
            }
        }
    }
};

if (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().indexOf("local") !== -1)) {
    config.ws.serverAddress = "127.0.0.1";
    config.ws.port = "6002";
    config.ws.externalAddress = config.ws.serverAddress;
    config.ws.externalPort = config.ws.port;
    config.logger.transport.console.json = false;
    config.logger.transport.console.prettyPrint = false;
    config.postgres.options.host = process.env.POSTGRES_HOST || 'localhost';
}

module.exports = config;
