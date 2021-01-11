#!/bin/sh

docker run -p 6699:6688 --name kovan-cl -v ~/ela/ethWatcher/kovan/.chainlink-kovan:/chainlink -it --env-file=.env smartcontract/chainlink:0.9.5 local n 