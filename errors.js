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

module.exports = {
    Errors: {
        DatabaseError: {code: 500, content: "Internal server error, unable to set authorization data for device"},
        InvalidToken: {code: 401, content: "Invalid device token for device"},
        WrongDataFormat: {code: 401, content: "Wrong message format"}
    },
    Success: {
        Subscribed: {code: 200, content: "Record in database update for device"},
        Pong: {code: 202, content: "PONG"}
    },
    build: function(errObj) {
        return JSON.stringify(errObj);
    }
};
