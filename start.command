#!/bin/bash
PATH=/usr/local/bin:/bin:/usr/bin:/sbin:/usr/sbin export PATH
cd `dirname $0`
mongod --dbpath=./data/db & grunt serve
