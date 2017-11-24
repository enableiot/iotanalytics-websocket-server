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

var os = require('os');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var vcap_services = appEnv.getServices();

exports.getServiceCredentials = function (name) {
    var credentials = vcap_services[name] ? vcap_services[name].credentials || {} : {};
    return credentials;
};

exports.getApplicationUri = function (name) {
    var url = '';
    if (appEnv.url) {
        url = appEnv.url.split("//")[1];
    }
    return url;
};

exports.getPort = function () {
    return appEnv.port;
};

exports.getHost = function () {
    return os.hostname();
};