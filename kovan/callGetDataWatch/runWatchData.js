const RunJSON = require('./contracts/DataSubscriber.json');
const Web3 = require('web3');
const web3Obj = new Web3('https://kovan.infura.io/v3/7e31d49d7c8a48f4a4539aff9da768e7');

const ContractAddress = "0xad04CcF39d7AF04216BFcc2f49C30caA658C77ae";
const privateKey = "c03b0a988e2e18794f2f0e881d7ffcd340d583f63c1be078426ae09ddbdec9f5";

const oracle = "0x90688d075506b69EB5fDbF7f01CfDb27130c85B2";
const jobID = "6372a99d778147a09f039e56d30f61ba";


const Run = new web3Obj.eth.Contract(RunJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 8000000
});

async function main() {

  const arguments = process.argv.splice(2);
  var transaction;
  if(arguments.length == 0){
    transaction = getCallMethod(0);
    }else{
    nType = parseInt(arguments[0]);
    transaction = getCallMethod(nType);
  }

  const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);
  const options = {
    to      : transaction._parent._address,
    data    : transaction.encodeABI(),
    gas     : await transaction.estimateGas({from: account.address}),
    gasPrice: await web3Obj.eth.getGasPrice() // or use some predefined value
  };

  const signed  = await web3Obj.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3Obj.eth.sendSignedTransaction(signed.rawTransaction);
  
  //console.log(receipt["logs"]);
  
};


function getCallMethod(nType){

  var transaction;

  //RequestBtcScore 0
  if(nType == 0){ 
    transaction = Run.methods.RequestBtcScore(
      oracle,
      jobID
    );
  //RequestBtcBalance 1  
  }else if(nType == 1){
    transaction = Run.methods.RequestBtcBalance(
      oracle,
      jobID
    );
  //RequestBtcTimespan 2    
  }else if(nType == 2){
    transaction = Run.methods.RequestBtcTimespan(
      oracle,
      jobID
    );
  //RequestEthScore 3    
  }else if(nType == 3){
    //TODO
  //RequestEthBalance 4   
  }else if(nType == 4){
    transaction = Run.methods.RequestEthBalance(
      oracle,
      jobID
    );
  //RequestEthTimespan 5   
  }else if(nType == 5){
    transaction = Run.methods.RequestEthTimespan(
      oracle,
      jobID
    );
  }

  return transaction;

}

main().then(() => {
  console.log("kovan OK");
}).catch((e) => {
    console.log("error", e.message);
});
  