#!/bin/bash 
# This is a very simple example

echo "watch btc score from kovon chain"
cd kovan/callGetDataWatch
node runWatchData.js

echo "get btc score from regest chain"
cd ../../
cd regest/callGetDataWork
node runGetData.js


# echo "get btc balance from test chain"
# cd ../../
# cd test/callGetDataWork
# node btcRunBalance.js
