#!/bin/bash 
# This is a very simple example

echo "watch btc timespan from kovon chain"
cd kovan/callGetDataWatch
node btcWatchTimespan.js

echo "get btc timespan from regest chain"
cd ../../
cd regest/callGetDataWork
node btcRunTimespan.js

# echo "get btc timespan from test chain"
# cd ../../
# cd test/callGetDataWork
# node btcRunTimespan.js
