#!/bin/bash
# Copyright (c) 2015 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -e
set -x

ENV=ci

# Parse options
while getopts "b:e:" opt; do
    case "$opt" in
    b) BUILD=$OPTARG;;
    e) ENV=${OPTARG,,};;
    esac
done

if [ "x$BUILD" == "x" ]
then
  echo "Creating new package"
  grunt packaging
else
  echo "Creating new package with buildID $BUILD"
  grunt packaging --buildID $BUILD
fi

ls
ls dist

#echo "Publishing into ${ENV} S3 bucket"
#s3cmd --disable-multipart sync dist/iotkit-websocket-server_*.tar.gz s3://dpeak/artifacts/${ENV}/iotkit-websocket-latest.tar.gz
echo "Done"
