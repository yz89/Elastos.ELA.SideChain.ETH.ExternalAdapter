#!/bin/sh

docker run -p 6688:6688 --name test-cl -v ~/ela/ethWatcher/test/.chainlink-test:/chainlink -it --env-file=.env smartcontract/chainlink:0.9.5 local n 