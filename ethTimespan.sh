#!/bin/bash 
# This is a very simple example

echo "watch btc timespan from kovon chain"
cd kovan/callGetDataWatch
node ethWatchTimespan.js

echo "get btc timespan from regest chain"
cd ../../
cd regest/callGetDataWork
node ethRunTimespan.js

# echo "get btc timespan from test chain"
# cd ../../
# cd test/callGetDataWork
# node ethRunTimespan.js
