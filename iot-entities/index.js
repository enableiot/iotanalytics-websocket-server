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

var config = require('../config').postgres,
    Sequelize = require('sequelize'),
    logger = require('../lib/logger/winstonLogger');


var getSequelizeOptions = function () {
    var options = config.options;
    options.logging = function (entry) {
        logger.debug(entry);
    };
    return options;
};

var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    getSequelizeOptions()
);

var connect = function () {
    return sequelize.authenticate()
        .then(function () {
            logger.info("Connected to " + config.database + " db in postgresql on: " + JSON.stringify(config.options));
        });
};

module.exports.connect = connect;
module.exports.sequelize = sequelize;
module.exports.connectionBindings = require('./connectionBindings');