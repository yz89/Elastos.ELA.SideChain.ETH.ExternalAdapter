#!/bin/bash 
# This is a very simple example

echo "watch eth balance from kovon chain"
cd kovan/callGetDataWatch
node ethWatchBalance.js

echo "get eth balance from regest chain"
cd ../../
cd regest/callGetDataWork
node ethRunBalance.js

# echo "get eth balance from test chain"
# cd ../../
# cd test/callGetDataWork
# node ethRunBalance.js
