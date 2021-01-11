#!/bin/bash 
# This is a very simple example

echo "watch btc balance from kovon chain"
cd kovan/callGetDataWatch
node btcWatchBalance.js

echo "get btc balance from regest chain"
cd ../../
cd regest/callGetDataWork
node btcRunBalance.js


# echo "get btc balance from test chain"
# cd ../../
# cd test/callGetDataWork
# node btcRunBalance.js
