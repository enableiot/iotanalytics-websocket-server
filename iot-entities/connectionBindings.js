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

var sequelize = require('../iot-entities').sequelize;

var WEBSOCKET = 'ws',
    QUERY = 'SELECT * FROM dashboard.update_device_connection (:deviceId, :server, :connectingStatus, :type)';

exports.update = function (deviceId, server, connectingStatus, resultCallback) {
    var replacements = {
        deviceId: deviceId,
        server: server,
        connectingStatus: connectingStatus,
        type: WEBSOCKET
    };

    return sequelize.query(QUERY, {replacements: replacements})
        .then(function (result) {
            if (!result || !result[0][0]) {
                throw new Error('Unable to update record in db');
            } else {
                resultCallback(null, result);
            }
        })
        .catch(function (err) {
            resultCallback(err);
        });
};
