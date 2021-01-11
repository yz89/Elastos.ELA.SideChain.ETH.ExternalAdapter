const DataConsumer = require('../../regest/callGetDataWork/contracts/DataConsumer.json');
const Web3 = require('web3');

const ContractAddress = "0xFA0217F522217a6E279a792C5F685A52042d6243";

//xxl 切换本地节点
const ws = "ws://192.168.1.8:8546";
//const ws = "ws://0.0.0.0:8546";
//const ws = "wss://kovan.infura.io/ws/v3/7e31d49d7c8a48f4a4539aff9da768e7";

console.log("watch btc chain balance");

//var web3Obj = new Web3(ws);
const web3Obj = new Web3()
const provider = new Web3.providers.WebsocketProvider(ws);
web3Obj.setProvider(provider);

const dataConsumerContract = new web3Obj.eth.Contract(DataConsumer.abi, ContractAddress, {
gasPrice: 1000000000, // 1gwei
gasLimit: 4000000,
});


// events = dataConsumerContract.events;
// events.all(function(error, event){
//     if (error) {
//         console.log("Error: " + error);
//     } else {
//         console.log(event.event + ": " + JSON.stringify(event.args));
//     }
// });

// console.log(dataConsumerContract.events);

dataConsumerContract.events.RequestBtcScoreResult({
}, function(err, data) {

	console.log(err);
	console.log(data);
	console.log(data["Result"][1]);
	console.log("catch ...");

});





